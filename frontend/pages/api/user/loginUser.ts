import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
       const userId= req.body.user_id;
       const user = await db
           .collection("users")
           .find({userId})
           .sort({ metacritic: -1 })
           .toArray();
       res.status(200).json(user);
   } catch (e) {
       console.error(e);
   }
}