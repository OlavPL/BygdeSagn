import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //PUT, add's a comment in to a Sagn's comments array
  if (req.method === "PUT") {
    const client = await clientPromise;
    const db = client.db("App_Db");
    const id = new ObjectId(req.body._id as string);
    const newComment = {
      _id:new ObjectId().toString(),
      text: req.body.comment.text,
      owner: req.body.comment.user.email,
      postedAt: new Date()

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
    //GET, returns the users comments 
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
  } else if (req.method === "DELETE") {
    const  postId= req.query.postId;
    const  commentId= req.query.commentId;
    if (!postId || !commentId) {
      res.status(400).json({ message: "postId and commentId are required" });
      return;
    }
    try {
      const client = await clientPromise;
      const db = client.db("App_Db");
      const doc_id = new ObjectId(postId as string);
      const result = await db.collection(process.env.POST_COLLECTION!).updateOne(
        { _id: doc_id },
        { $pull: { comments: { _id: commentId } } }
      );
      if (result.modifiedCount === 0) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting comment" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  
}
