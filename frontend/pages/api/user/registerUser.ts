import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");

       let bodyObject = JSON.parse(req.body);
       let myPost = await db.collection("users").insertOne(bodyObject);
      
       res.json(myPost);
       console.log(myPost)
   } catch (e) {
       console.error(e);
   }
}