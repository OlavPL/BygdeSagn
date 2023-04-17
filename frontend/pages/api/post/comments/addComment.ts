import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
    const client = await clientPromise;
    const db = client.db("App_Db");
    const id = (req.body.postId)
    const newComment = req.body.comment;
    const updateDocument={
        $push:{
            comments: newComment
        },
    };
    const result = await db.collection(process.env.POST_COLLECTION!).updateOne({postId:id},updateDocument)
    res.status(200).json("Comments Updated"+" postId:"+ id)

    
   } catch (e) {
       console.error(e);
   }
}