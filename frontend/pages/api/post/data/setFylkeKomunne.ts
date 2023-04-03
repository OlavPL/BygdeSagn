import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRouter, useRouter } from "next/router";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
    
       fetch('https://ws.geonorge.no/kommuneinfo/v1/fylkerkommuner')
       .then((res) => res.json())
       .then((data) => {
        let myPost = db.collection("Fylker2").insertMany(data);
        res.status(200).json(myPost);
       })

       //let myPost = await db.collection("posts").insertOne(bodyObject);
      // let myPost = await db.collection("Fylker2").insertMany(bodyObject);
       //metod to create index's
      // db.collection("fylker").createIndex({"sted":1},{unique:true})
      // res.status(200).json(myPost);
       console.log("Sted Created")
       
   } catch (e) {
       console.error(e);
   }
}