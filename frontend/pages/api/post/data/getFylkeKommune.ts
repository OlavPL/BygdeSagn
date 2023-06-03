import clientPromise from "@/lib/mongodb";
import { Kommune } from "@/types/kommune";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRouter, useRouter } from "next/router";

interface FylkeI {
    _id: string;
    fylkenavn: string;
    fylkenummer: string;
    kommuner:Kommune[];
  }


  export default async function handler (req:NextApiRequest, res:NextApiResponse)  {
   try {
       const client = await clientPromise;
       const db = client.db("App_Db");
    
       fetch('https://ws.geonorge.no/kommuneinfo/v1/fylkerkommuner')
       .then((res) => res.json())
       .then((data) => {
        res.status(200).json(data);
       })
       console.log("Fylker fetched")
       
   } catch (e) {
       console.error(e);
   }
}