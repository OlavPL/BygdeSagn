import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRouter, useRouter } from "next/router";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");

       let bodyObject =(req.body);
       
    //    let myPost = await db.collection("posts").insertOne(bodyObject);
       let myPost = await db.collection(process.env.POST_COLLECTION!).insertOne(bodyObject);
       //metod to create index's
       //db.collection("posts").createIndex({"post_id":1},{unique:true})
       return res.status(200).json(myPost);
    } catch (e) {
       console.error(e);
       return res.status(301)
   }
}