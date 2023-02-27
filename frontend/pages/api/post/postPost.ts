import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");

       let bodyObject =(req.body);
       let myPost = await db.collection("posts").insertOne(bodyObject);
       //metod to create index's
      // db.collection("posts").createIndex({"titel":1},{unique:true})
       res.status(200).json(myPost);
       console.log("Post Created")
   } catch (e) {
       console.error(e);
   }
}