import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
    const client = await clientPromise;
    const db = client.db("App_Db");
    const id = req.body.postId;
    const user = req.body.user;
    
    if (req.method === 'PUT') {
        // Check if the post already has the user's like
        const existingDocument = await db.collection(process.env.POST_COLLECTION!).findOne({postId: id, likes: user});
        if (existingDocument) {
            // User has already liked the post, send response to client
            res.status(409).json({message: "User has already liked this post"});
            return;
        }
        
        // Add the user's like to the post
        const updateDocument = {
            $push: {
                likes: user
            }
        };
        await db.collection(process.env.POST_COLLECTION!).updateOne({postId:id},updateDocument);
        
        // code from the second snippet
        const updateDocument2 = {
            $pull: {
                dislikes: req.body.user
            },
        };
        const result = await db.collection(process.env.POST_COLLECTION!).updateOne({postId:id},updateDocument2);
        
        res.status(200).json({
            message: "Likes updated and removed",
            postId: id,
            user: user,
            object: result
        });
    } else if (req.method === 'DELETE') {
        const updateDocument = {
            $pull: {
                likes: user
            }
        };
        await db.collection(process.env.POST_COLLECTION!).updateOne({postId:id},updateDocument);

        res.status(200).json({
            message: "Likes removed",
            postId: id,
            user: user
        });
    } else {
        res.status(405).json({message: "Method not allowed"});
    }
    
   } catch (e) {
       console.error(e);
       res.status(500).json({message: "Server error"});
   }
}
