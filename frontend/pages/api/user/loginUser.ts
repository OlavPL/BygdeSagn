import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");

       const user = await db
           .collection("users")
           .find({})
           .sort({ metacritic: -1 })
           .toArray();

       res.status(200).json(user);
       
   } catch (e) {
       console.error(e);
   }
}