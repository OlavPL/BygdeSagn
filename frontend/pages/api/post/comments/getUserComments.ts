import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method === "GET") {
    const email = req.query.email as string;
    const client = await clientPromise;
    const result = await client
      .db("App_Db")
      .collection(process.env.POST_COLLECTION!)
      .find({ "comments.owner": email })
      .toArray();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No comments found for user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}