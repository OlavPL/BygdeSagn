import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
//Hente et enkelt innlegg
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const client = await clientPromise;
    const result = await client
      .db("App_Db")
      .collection(process.env.POST_COLLECTION!)
      .findOne({ _id: new ObjectId(req.query._id!.toString()) });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
