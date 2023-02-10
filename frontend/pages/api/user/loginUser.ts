import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");

       const user = await db
           .collection("users")
           .find({})
           .sort({ metacritic: -1 })
           .toArray();

       res.json(user);
       
   } catch (e) {
       console.error(e);
   }
}