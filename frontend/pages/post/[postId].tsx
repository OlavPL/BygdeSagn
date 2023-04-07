import Sagn from "@/objects/sagn";
import Kommune from "@/types/Kommune";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clientPromise from "@/lib/mongodb";
import CardTags from "@/components/Sagn/sagnCard/cardTags";

interface Props {
    title: string
    text: string;
    tags: string[];
    likes: number;
    dislikes: number;
    id?: string;
    postedAt: number;
    happenedAt?: number;
    author: string;
    kommune: Kommune;
    stedsnavn?: string;
}


const SagnFullView = (props:any) =>{
    const sagnProp = props.sagn
    const sagn:Sagn = new Sagn(props.sagn.title, sagnProp.text, sagnProp.tags, sagnProp.postedAt, sagnProp.kommune, sagnProp.stedsnavn, sagnProp.postId, sagnProp.likes, sagnProp.dislikes, sagnProp.happenedAt)
  
    
    return (
        <div className="flex flex-col p-4 rounded-md max-w-screen-2xl mx-auto mt-5 shadow-xl">
            <h2 className="text-xl font-bold mb-2 ">{sagn.title}</h2>
            <p className="text-lg mb-4">{sagn.text}</p>
            <p className="text-gray-600 mb-4">{new Date(sagn.postedAt).toLocaleString("no")}</p>
            {/* <p className="text-gray-600 mb-4">Tags: {sagn.tags[0]}</p> */}
            <div className="flex space-x-4">
                <p className="text-gray-600 mb-4">Kommune: {sagn.kommune.kommunenavnNorsk} {'->'} {sagn.stedsnavn}</p>
            </div>
            <CardTags tags={sagn.tags}/>            
            <div className="flex space-x-4">
                <p className="text-green-500 font-bold">Likes: {sagn.likes.length}</p>
                <p className="text-red-500 font-bold">Dislikes: {sagn.dislikes.length}</p>
            </div>
            <p className="text-gray-600 mb-4">Skjedde i år {sagn.happenedAt? new Date(sagn.happenedAt).toLocaleString() : "Ukjent"}</p>
            {/* <p className="text-gray-600">Author: {sagn.author.email}</p> */}
        </div>
    );
};

// export async function getServerSideProps({context: {props: { postID:number} }}) {
export async function getServerSideProps(context: {params: { postId:number} }) {
    try {
        const {params} = context
        const {postId} = params
        const client = await clientPromise;
        const db = client.db("App_Db");

        const response = await db
        .collection("testPosts")
        .findOne({postId:Number(postId)})

        return {
            props: {sagn: JSON.parse(JSON.stringify(response))}
        };
    } catch (e) {
        console.error(e);
    }

}

export default SagnFullView