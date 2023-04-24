import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const client = await clientPromise;
    const db = client.db("App_Db");
    const id = new ObjectId(req.body._id as string);
    const newComment = {
      text: req.body.comment.text,
      owner: req.body.comment.user.name,
      postedAt: new Date().setUTCHours(new Date().getUTCHours() + 1 )
    };
    const updateDocument = {
      $push: {
        comments: {
          $each: [newComment],
        }
      },
    };
    const result = await db.collection(process.env.POST_COLLECTION!).updateOne({ _id: id }, updateDocument);
    res.status(200).json("Comments Updated" + " _id:" + id);
  } else if (req.method === "DELETE") {
    const client = await clientPromise;
    const db = client.db("App_Db");
    const id = req.body._id;
    const commentId = req.body.commentId;
    const updateDocument = {
      $pull: {
        comments: [{ id: commentId }]
      },
    };
    const result = await db.collection(process.env.POST_COLLECTION!).updateOne({ _id: id }, updateDocument);
    res.status(200).json("Dislikes Updated" + " id:" + id);

    //GET brukeren sine kommentarer
  } else if (req.method === "GET") {
    const email = req.query.email as string;
    const client = await clientPromise;
    const result = await client
      .db("App_Db")
      .collection(process.env.POST_COLLECTION!)
      .find({ "comments.user.email": email })
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
