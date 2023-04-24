import clientPromise from "@/lib/mongodb";
import SimpleCrypto from "simple-crypto-js";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

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

      const myPost = await db.collection("users").insertOne(bodyObject);
      res.status(200).json(myPost);
      console.log("User posted");
      //Login
    } else if (req.method === "GET") {
      const userId= req.body.user_id;
      const user = await db
        .collection("users")
        .find({userId})
        .sort({ metacritic: -1 })
        .toArray();
      res.status(200).json(user);
      //Delete User
    } else if (req.method === "DELETE") {
      const myPost = await db.collection("users").deleteOne({name:req.body.name});
      res.status(200).json(myPost);
      console.log(myPost);
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
      const result = await db.collection("users").updateOne({user_id: new ObjectId(id)}, updateDocument);
      res.status(200).json(`Document Updated, id: ${id}`);
      console.log("User updated");
    }
  } catch (e) {
    console.error(e);
  }
}
