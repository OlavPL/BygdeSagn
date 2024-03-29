import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
    const client = await clientPromise;
    const db = client.db("App_Db");
    const id = new ObjectId(req.body._id);
    const user = req.body.user;
    
    // PUT returnere ut av founksjon om brukeren allerede ligger i liker listen til sagnet.
    // Ellers forsøkes det å dra ut brukeren fra dislike og like dokumetnet og legger brukeren til i like 
    if (req.method === 'PUT') {
        const existingDocument = await db.collection(process.env.POST_COLLECTION!).findOne({_id: id, likes: user});
        if (existingDocument) {
            const updateDocument = {
                $pull: {
                    likes: user
                }
            };
            await db.collection(process.env.POST_COLLECTION!).updateOne({_id:id},updateDocument);
            return res.status(201).json({message: "User has already liked this post"});
        }
        else{
            const updateDocument = {
                $push: {
                    likes: user
                }
            };
            await db.collection(process.env.POST_COLLECTION!).updateOne({_id:id},updateDocument);
            
            const updateDocument2 = {
                $pull: {
                    dislikes: req.body.user
                },
            };
            const result = await db.collection(process.env.POST_COLLECTION!).updateOne({_id:id},updateDocument2);
            const returnDocument = await db.collection(process.env.POST_COLLECTION!).findOne({_id:id});
            return res.status(200).json({
                message: "Likes updated and removed",
                _id: id,
                user: user,
                object: result,
                document:returnDocument
            });
        }
        
    // DELETE sjekker om bruker ligger i likes liste på dikumentet og fjerner brukeren om den er
    } else if (req.method === 'DELETE') {
        const updateDocument = {
            $pull: {
                likes: user
            }
        };
        await db.collection(process.env.POST_COLLECTION!).updateOne({_id:id},updateDocument);

        return res.status(200).json({
            message: "Likes removed",
            _id: id,
            user: user
        });
    } else {
        return res.status(405).json({message: "Method not allowed"});
    }
    
   } catch (e) {
       console.error(e);
       return res.status(500).json({message: "Server error"});
   }
}
