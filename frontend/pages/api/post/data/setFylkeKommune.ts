import clientPromise from "@/lib/mongodb";
import Kommune from "@/types/Kommune";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRouter, useRouter } from "next/router";

interface FylkeI {
    _id: string;
    fylkenavn: string;
    fylkesnummer: string;
    kommuner:Kommune[];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
        const client = await clientPromise;
        const db = client.db("App_Db");

        let myPost = db.collection("Fylker3").insertMany(req.body);
        res.status(200).json(myPost);
       console.log("Sted Created")
       
   } catch (e) {
       console.error(e);
   }
}