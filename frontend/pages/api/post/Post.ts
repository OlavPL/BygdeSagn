import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const collection = client.db("App_Db").collection(process.env.POST_COLLECTION!);

  if (req.method === "GET") {
    const result = await collection.find().toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No posts found" });
    }
  } else if (req.method === "DELETE") {
    const postId = parseInt(req.query.postId as string);
    const result = await collection.deleteOne({ postId: postId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } else if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("App_Db");

      let bodyObject = req.body;

      let myPost = await db.collection(process.env.POST_COLLECTION!).insertOne(bodyObject);
      return res.status(200).json(myPost);
    } catch (e) {
      console.error(e);
      return res.status(301);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
