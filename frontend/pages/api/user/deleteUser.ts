import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
       let myPost = await db.collection("users").deleteOne({name:req.body.name});
       res.status(200).json(myPost);
       console.log(myPost)
   } catch (e) {
       console.error(e);
       console.log("User deleted")
   }
}