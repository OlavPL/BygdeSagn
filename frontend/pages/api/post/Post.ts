import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import validator from "validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const collection = client.db("App_Db").collection(process.env.POST_COLLECTION!);
  //GET Sagn
  if (req.method === "GET") {
    let result;
    if (!req.query._id || req.query._id == null) {
      result = await collection.find().toArray();
    } else if (validator.isMongoId(req.query._id.toString())) {
      result = await client
        .db("App_Db")
        .collection(process.env.POST_COLLECTION!)
        .findOne({ _id: new ObjectId(req.query._id.toString()) });
    } else {
      return res.status(400).json({ error: "Invalid _id parameter" });
    }
  
    if (result === null || result.length <= 0) {
      res.status(404).json({ message: "No posts found" });
    } else {
      res.status(200).json(result);
    }
    //Slett Sagn
  } else if (req.method === "DELETE") {
    const result = await collection.deleteOne({ _id: new ObjectId(req.query._id?.toString()) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
    //Post Sagn
  }if (req.method === 'POST') {
    const { stedsnavn, kommune } = req.body;
  
    // validate stedsnavn and kommune.. Validering av Text felt og Tittel skjer i Frontend
    if (!stedsnavn || !validator.isAlpha(stedsnavn)) {
      return res.status(400).json({ error: 'Invalid stedsnavn' });
    }
  
    if (!kommune || !kommune.fylkesnummer || !validator.isNumeric(kommune.fylkesnummer)
        || !kommune.kommunenummer || !validator.isNumeric(kommune.kommunenummer)) {
      return res.status(400).json({ error: 'Invalid kommune' });
    }
  
    try {
      const client = await clientPromise;
      const db = client.db('App_Db');
  
      let myPost = await db.collection(process.env.POST_COLLECTION!).insertOne(req.body);
  
      if (req.body.stedsnavn) {
        await db.collection('fylker').updateOne(
          { fylkenummer: req.body.kommune.fylkesnummer },
          {
            $addToSet: {
              'kommuner.$[kommune].stedsnavnList': {
                kommune: req.body.kommune.kommunenummer,
                stedsnavn: req.body.stedsnavn
              }
            }
          },
          { arrayFilters: [{ 'kommune.kommunenummer': req.body.kommune.kommunenummer }] }
        );
      }
      
      return res.status(200).json(myPost);
    } catch (e) {
      console.error(e);
      return res.status(301);
    }
    //Update Sagn
  } else if (req.method === "PUT") {
    try {
      const client = await clientPromise;
      const db = client.db("App_Db");
      const id = req.body._id;

      const result = await db.collection(process.env.POST_COLLECTION!).updateOne(
        { _id: id },
        {
          $set: {
            ...req.body, 
          },
        }
      );

      res.status(200).json("Document Updated" + " id:" + id);
    } catch (e) {
      console.error(e);
    }
    
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
