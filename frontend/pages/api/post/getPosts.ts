import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
       const post = await db
           .collection("posts")
           .find({})
           .sort({ metacritic: -1 })
           .toArray();

       res.json(post);
       console.log(post);
       
   } catch (e) {
       console.error(e);
   }
}