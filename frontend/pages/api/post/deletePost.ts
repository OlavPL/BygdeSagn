/* eslint-disable import/no-anonymous-default-export */
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
       //await.db.collection("posts").findOne({title:req.body.titel});
       let myPost = await db.collection("posts").deleteOne({title:req.body.title});
       res.status(200).json(req.body.title+"is deleted");
       console.log("Post deleted")
   } catch (e) {
       console.error(e);
   }
}