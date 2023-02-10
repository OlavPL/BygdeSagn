import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");

       let bodyObject = JSON.parse(req.body);
       let myPost = await db.collection("posts").insertOne(bodyObject);
       res.json(myPost.ops[0]);
   } catch (e) {
       console.error(e);
   }
}