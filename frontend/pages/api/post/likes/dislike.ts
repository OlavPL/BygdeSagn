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
    
    // PUT returnere ut av founksjon om brukeren allerede ligger i dislike listen til sagnet.
    // Ellers forsøkes det å dra ut brukeren fra dislike og like dokumetnet og legger brukeren til i dislike 
    // Sagnet blir også sjekket av automod ved dislike. 
    if (req.method === 'PUT') {
        const existingDocument = await db.collection(process.env.POST_COLLECTION!).findOne({_id: id, dislikes: user});
        if (existingDocument) {

            await db.collection(process.env.POST_COLLECTION!)
            .updateOne(
                {_id:id}, 
                {$pull: { dislikes: user }}
            );
            return res.status(201).json({message: "User has already disliked this post"});
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

        
        return res.status(200).json({
            message: "Likes updated and removed",
            _id: id,
            user: user,
            object: result
        });
        
    // DELETE sjekker om bruker ligger i Dislike liste på dikumentet og fjerner brukeren om den er
    } else if (req.method === 'DELETE') {

        await db.collection(process.env.POST_COLLECTION!)
        .updateOne(
            {_id:id},
            {$pull: { dislikes: user }}
        );

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

// Denne metoden sjekker om forholdet mellom likes og dislikes på et sagn går under grensen som er satt i "../controllers/autmod", 
// om den er det så blir sagnet flagget og en varsel vil komme opp på visning av sagnet. 
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
