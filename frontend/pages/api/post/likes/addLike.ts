import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
    const client = await clientPromise;
    const db = client.db("App_Db");
    const id = (req.body.postId)
    console.log(id)
    const updateDocument={
        $push:{
            likes:req.body.user
        },
    };
    const result = await db.collection(process.env.POST_COLLECTION!).updateOne({postId:id},updateDocument)
    res.status(200).json("Likes Updated"+" id:"+ id)

    
   } catch (e) {
       console.error(e);
   }
}