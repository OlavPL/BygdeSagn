import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";


export default async function handler (req:NextApiRequest, res:NextApiResponse) {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
       const post= await db
           .collection("kommuner")
           .find({})
           .sort({ metacritic: -1 })
           .toArray()
       res.status(200).json(post);
       
   } catch (e) {
       console.error(e);
   }
}