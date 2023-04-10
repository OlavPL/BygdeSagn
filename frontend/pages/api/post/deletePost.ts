import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
       const { postId } = req.body.postId;
       const result = await db.collection(process.env.POST_COLLECTION!).deleteOne({ postId: postId });
       
       if (result.deletedCount === 1) {
           res.status(200).json({ message: `Post ${postId} deleted` });
           console.log(`Post with ${postId} deleted`);
       } else {
           res.status(404).json({ message: `Post with  ${postId} not found` });
       }
   } catch (e) {
       console.error(e);
       res.status(500).json({ message: "Internal server error" });
   }
}
