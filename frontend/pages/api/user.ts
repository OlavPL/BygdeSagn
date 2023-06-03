import clientPromise from "@/lib/mongodb";

import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import validator from 'validator';
import bcrypt from 'bcrypt';
dotenv.config();

const { SECRET_KEY } = process.env;

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("App_Db");
    
//Registrering av bruker
    
if (req.method === "POST") {
  const bodyObject = req.body;
  //Bcrypt oppsett og hasing av passord
  const saltRounds = (10);
  const hashedPassword = await bcrypt.hash(bodyObject.password, saltRounds);
  bodyObject.password = hashedPassword;

  // Validaering av input som blir sendt inn
  if (!validator.isEmail(bodyObject.email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (!validator.isStrongPassword(bodyObject.password)) {
    return res.status(400).json({ error: "Password must be at least 10 characters long and contain a combination of uppercase and lowercase letters, numbers, and symbols" });
  }

  const myPost = await db.collection("users").insertOne(bodyObject);
  res.status(200).json(myPost);
  console.log("User posted");

  //Login av bruker
} else if (req.method === 'GET') {
  const email = Array.isArray(req.query.email) ? req.query.email[0] : req.query.email;
  if (!validator.isEmail(email!)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  const user = await db
    .collection('users')
    .findOne({ email });

  if (user) {
    res.status(200).json({ exists: true });
  } else {
    res.status(200).json({ exists: false });
  }
  //Oppdatering av bruker, ikke implementert
}else if (req.method === "PUT") {
      const id = req.body.user_id;
      const updateDocument = {
        $set: {
          name: req.body.name,
          epost: req.body.epost,
          password: req.body.password
        }
      };
      
      // Validaering av input som blir sendt inn
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
        // Sletter alle sagn lagt ut av en bruker, ikke ferdig implementert enda.
        await db.collection(process.env.POST_COLLECTION!).deleteMany({"owner.email": email});
        
        // Sletter alle kommentarer som har blit gjort av brukeren, ikke ferdig implementert enda.
        const posts = await db.collection(process.env.POST_COLLECTION!).find({ "comments.owner.email": email }).toArray();

        for (const post of posts) {
          await db.collection(process.env.POST_COLLECTION!).updateOne({ _id: post._id }, { $pull: { comments: { owner: { email } } } });
        }
        
        res.status(200).json({ message: `User ${email} have been deleted` });
      } else {
        res.status(404).json({ error: `User ${email} not found` });
      }
      console.log("User deleted");
    }
  } catch (e) {
    console.error(e);
  }
};
