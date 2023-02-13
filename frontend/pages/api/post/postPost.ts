import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");

       let bodyObject = JSON.parse(req.body);
       let myPost = await db.collection("posts").insertOne(bodyObject);
       res.status(200).json(myPost);
   } catch (e) {
       console.error(e);
   }
}