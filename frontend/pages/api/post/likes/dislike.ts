import { dislikeRatioThreshold } from "@/controllers/automod";
import clientPromise from "@/lib/mongodb";
import { Db, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
    const client = await clientPromise;
    const db = client.db("App_Db");
    const id = new ObjectId(req.body._id);
    const user = req.body.user;
    
    if (req.method === 'PUT') {
        const existingDocument = await db.collection(process.env.POST_COLLECTION!).findOne({_id: id, dislikes: user});
        if (existingDocument) {

            await db.collection(process.env.POST_COLLECTION!)
            .updateOne(
                {_id:id}, 
                {$pull: { dislikes: user }}
            );
            res.status(201).json({message: "User has already disliked this post"});
            return;
        }

        await db.collection(process.env.POST_COLLECTION!)
        .updateOne(
            {_id:id},
            {$pull: { likes: user }}
        );

        const result = await db.collection(process.env.POST_COLLECTION!)
        .updateOne(
            {_id: id},
            {$push: { dislikes: user }}
        );
        
        checkAutomodLikeThreshold(id, db)

        
        res.status(200).json({
            message: "Likes updated and removed",
            _id: id,
            user: user,
            object: result
        });
    } else if (req.method === 'DELETE') {

        await db.collection(process.env.POST_COLLECTION!)
        .updateOne(
            {_id:id},
            {$pull: { dislikes: user }}
        );

        res.status(200).json({
            message: "Likes removed",
            _id: id,
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

const checkAutomodLikeThreshold = async (id: ObjectId, db: Db) =>{
    let post =  await db.collection(process.env.POST_COLLECTION!)
    .findOne({_id: id});

    if(post!== null && post.dislikeRatio === null ){
        if( post.dislikes.length > 0 && ( post.likes.length - post.dislikes.length ) <= dislikeRatioThreshold) {
            await db.collection(process.env.POST_COLLECTION!)
            .updateOne(
                {_id: id},
                {$push: {dislikeRatioFlagged: true}},
                {upsert:true}
            );
        }

    }


}
