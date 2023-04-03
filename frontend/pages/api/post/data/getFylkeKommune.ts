import clientPromise from "@/lib/mongodb";
import Kommune from "@/types/Kommune";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRouter, useRouter } from "next/router";

interface FylkeI {
    _id: string;
    fylkenavn: string;
    fylkenummer: string;
    kommuner:Kommune[];
  }

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
    
       fetch('https://ws.geonorge.no/kommuneinfo/v1/fylkerkommuner')
       .then((res) => res.json())
       .then((data) => {
        res.status(200).json(data);
       })

       //let myPost = await db.collection("posts").insertOne(bodyObject);
      // let myPost = await db.collection("Fylker2").insertMany(bodyObject);
       //metod to create index's
      // db.collection("fylker").createIndex({"sted":1},{unique:true})
    //   res.status(200).json(myPost);
       console.log("Sted Created")
       
   } catch (e) {
       console.error(e);
   }
}