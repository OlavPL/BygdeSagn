import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";


export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
    const client = await clientPromise;
    const db = client.db("App_Db");
    const id = (req.body._id)
    console.log(id)

    const filter = new ObjectId(id)
    const updateDocument={
        $set:{
            titel:req.body.titel,
            content:req.body.content,
            date:req.body.date,
            dislikes:req.body.dislikes,
            likes:req.body.likes

        },
    };
    const result = await db.collection("posts").updateOne({_id:filter},updateDocument)
    res.status(200).json(updateDocument+id)

    
   } catch (e) {
       console.error(e);
   }
}