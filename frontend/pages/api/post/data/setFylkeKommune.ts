import clientPromise from "@/lib/mongodb";
import { Kommune } from "@/types/kommune";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRouter, useRouter } from "next/router";

interface FylkeI {
    _id: string;
    fylkenavn: string;
    fylkesnummer: string;
    kommuner:Kommune[];
}

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
   try {
        const client = await clientPromise;
        const db = client.db("App_Db");

        let myPost = db.collection("fylker").insertMany(req.body);
        res.status(200).json(myPost);
       console.log("Fylker Created")
       
   } catch (e) {
       console.error(e);
   }
}