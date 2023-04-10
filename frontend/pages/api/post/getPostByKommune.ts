import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const kommune = req.query.kommune;

    const client = await clientPromise;
    const result = await client
      .db("App_Db")
      .collection(process.env.POST_COLLECTION!)
      .find({ 'kommune.kommunenavn': kommune })
      .sort({ metacritic: -1 })
      .toArray()

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
