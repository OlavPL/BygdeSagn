import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
       let bodyObject = (req.body);
       let myPost = await db.collection("users").insertOne(bodyObject);
       //metod to create index's
       //db.collection("users").createIndex({"name":1},{unique:true})
       res.status(200).json(myPost);
       console.log("User Registered")
   } catch (e) {
       console.error(e);
       console.log("User allready exsists")
   }
}