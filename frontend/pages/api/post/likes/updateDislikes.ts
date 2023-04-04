import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
    const client = await clientPromise;
    const db = client.db("App_Db");
    const id = (req.body.post_id)
    console.log(id)
    const updateDocument={
        $set:{
            likes:req.body.dislikes
        },
    };
    // const result = await db.collection("posts").updateOne({post_id:id},updateDocument)
    const result = await db.collection(process.env.POST_COLLECTION!).updateOne({post_id:id},updateDocument)

    res.status(200).json("Dislikes Updated"+" id:"+ id)

    
   } catch (e) {
       console.error(e);
   }
}