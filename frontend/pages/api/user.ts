import clientPromise from "@/lib/mongodb";
import SimpleCrypto from "simple-crypto-js";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import validator from 'validator';

dotenv.config();

const { SECRET_KEY } = process.env;

// Create a new user
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("App_Db");
    //Register
    if (req.method === "POST") {
      const bodyObject = req.body;
      const simpleCrypto = new SimpleCrypto(SECRET_KEY);
      const encryptedPassword = simpleCrypto.encrypt(bodyObject.password);
      bodyObject.password = encryptedPassword;

      // Validation
      if (!validator.isEmail(bodyObject.email)) {
        return res.status(400).json({ error: "Invalid email" });
      }

      if (!validator.isStrongPassword(bodyObject.password)) {
        return res.status(400).json({ error: "Password must be at least 8 characters long and contain a combination of uppercase and lowercase letters, numbers, and symbols" });
      }

      const myPost = await db.collection("users").insertOne(bodyObject);
      res.status(200).json(myPost);
      console.log("User posted");
      //Login
    } else if (req.method === 'GET') {
      const { email } = req.query;
      const user = await db
        .collection('users')
        .findOne({ email });
  
      if (user) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
      
      //Update User
    } else if (req.method === "PUT") {
      const id = req.body.user_id;
      const updateDocument = {
        $set: {
          name: req.body.name,
          epost: req.body.epost,
          password: req.body.password
        }
      };
      
      // Validation
      if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      if (req.body.email && !validator.isEmail(req.body.email)) {
        return res.status(400).json({ error: "Invalid email" });
      }

      if (req.body.password && !validator.isStrongPassword(req.body.password)) {
        return res.status(400).json({ error: "Password must be at least 8 characters long and contain a combination of uppercase and lowercase letters, numbers, and symbols" });
      }

      const result = await db.collection("users").updateOne({user_id: new ObjectId(id)}, updateDocument);
      res.status(200).json(`Document Updated, id: ${id}`);
      console.log("User updated");

      // Delete User
    } else if (req.method === "DELETE") {
      const email = req.body.email;
      
      // Find user by email
      const user = await db.collection("users").findOneAndDelete({email});
      
      if (user) {
        // Delete all posts by user
        await db.collection(process.env.POST_COLLECTION!).deleteMany({"owner.email": email});
        
        // Delete all comments by user
        const posts = await db.collection(process.env.POST_COLLECTION!).find({ "comments.owner.email": email }).toArray();

        for (const post of posts) {
          await db.collection(process.env.POST_COLLECTION!).updateOne({ _id: post._id }, { $pull: { comments: { owner: { email } } } });
        }
      
      if (posts) {
        console.log(`Deleted ${posts} comments by user ${email}`);
      } else {
        console.log(`No comments found for user ${email}`);
      }
      
        
        
        res.status(200).json({ message: `User ${email} and all related posts and comments have been deleted` });
      } else {
        res.status(404).json({ error: `User ${email} not found` });
      }
      console.log("User and related posts and comments deleted");
    }
  } catch (e) {
    console.error(e);
  }
};
