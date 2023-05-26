import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Kommune } from "@/types/kommune";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const fylke = req.query.fylkenavn;

    const client = await clientPromise;
    const fylkeObject = await client
    .db("App_Db")
    .collection("fylker")
    .findOne({"fylkenavn":fylke})


    if(fylkeObject == null)
      return res.status(404).json({ message: "Post not found" });

    let kommuner = fylkeObject.kommuner;

    const posts = await client
      .db("App_Db")
      .collection(process.env.POST_COLLECTION!)
      .find()
      .sort({ metacritic: -1 })
      .toArray()

    let outKommuner = Array()
    posts.forEach(post => {
      kommuner.forEach((kommune:Kommune) => {
        if( kommune.kommunenummer === post.kommune.kommunenummer ){
          outKommuner.push(post)
          return
        }
      })
    })

    if (outKommuner.length > 0) {
      return res.status(200).json(outKommuner);
    } else {
      return res.status(404).json({ message: "Post not found" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
