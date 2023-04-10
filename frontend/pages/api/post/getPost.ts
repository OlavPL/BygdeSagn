import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
       const postId= req.body.postId;
       const search = await db
           .collection(process.env.POST_COLLECTION!)
           .findOne({postId:postId})
       res.status(200).json(search);
   } catch (e) {
       console.error(e);
   }
}