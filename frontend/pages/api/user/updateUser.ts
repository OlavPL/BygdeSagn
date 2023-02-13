import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";


export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
    const client = await clientPromise;
    const db = client.db("App_Db");
    const id = (req.body.user_id)
    console.log(id)
    const updateDocument={
        $set:{
            name:req.body.name,
            epost:req.body.epost,
            password:req.body.password

        },
    };
    
    const result = await db.collection("users").updateOne({user_id:id},updateDocument)
    res.status(200).json("Document Updated"+" id:"+ id)

    
   } catch (e) {
       console.error(e);
   }
}