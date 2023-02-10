import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
       const id = req?.body.id;
       const query = { _id: new ObjectId(id) };
       let bodyObject = JSON.parse(req.body);
       let myPost = await db.collection("posts").updateOne(query,bodyObject);
       res.json(req);
   } catch (e) {
       console.error(e);
   }
}