import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const email = (req.query.email as string);

    const client = await clientPromise;
    const result = await client
      .db("App_Db")
      .collection("users")
      .findOne({ email: email });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
