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
        
        // Combine the responses into a single JSON object
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
        
        // Send a single response to the client
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
