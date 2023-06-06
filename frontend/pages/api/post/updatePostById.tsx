import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import validator from "validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    try {
      const client = await clientPromise;
      const db = client.db("App_Db");
      const id = new ObjectId( req.body._id );

      const response = await db.collection(process.env.POST_COLLECTION!).updateOne(
        { _id: id },
        {
          $set: {
            title:req.body.title,
            text:req.body.text,
            tags:req.body.tags,
            happenedAt:req.body.happenedAt,
            kommune:req.body.kommune
            // kommune:req.body.title
            // likes:req.body.title
            // dislikes:req.body.title
            // postedAt:req.body.title
            // ...req.body, 
          },
        }
      );
      console.log(response)

      return res.status(200).json("Document Updated" + " id:" + id);
    } catch (e:any) {
        console.error(e)
        if (e.message.includes("Error connecting to MongoDB")) {
            res.status(500).json({ message: "Error connecting to MongoDB" });
        } else {
            res.status(500).json({ message: "Error" });
        }
    }
}
