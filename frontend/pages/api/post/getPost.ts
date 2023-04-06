import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
       const post_Id= req.body.post_id;
       const search = await db
           .collection(process.env.POST_COLLECTION!)
           .find( {post_Id} )
           .toArray();
       res.status(200).json(search);
   } catch (e) {
       console.error(e);
   }
}