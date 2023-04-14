import Sagn from "@/objects/sagn";
import Kommune from "@/types/typKommune";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clientPromise from "@/lib/mongodb";
import CardTags from "@/components/sagn/sagnCard/cardTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const SagnFullView = (props:any) =>{
    const sagnProp = props.sagn
    const sagn:Sagn = new Sagn(props.sagn.title, sagnProp.text, sagnProp.tags, sagnProp.postedAt, sagnProp.kommune, sagnProp.stedsnavn, sagnProp.postId, sagnProp.likes, sagnProp.dislikes, sagnProp.happenedAt)
  
    
    return (
        <div className="flex flex-col bg-emphasis-50 rounded-md max-w-screen-xl mx-2 lg:mx-auto mt-5 p-2 space-y-4 shadow-md font-semibold">
            <h2 className="text-xl font-bold text-center sm:text-start">{sagn.title}</h2>
            <p className="max-h-96 overflow-y-auto">{sagn.text}</p>
            {/* <p className=" mb-4">Tags: {sagn.tags[0]}</p> */}
            <div className="flex flex-col sm:flex-row w-full">
                <div className="flex flex-row w-full sm:w-auto">
                    <p ><FontAwesomeIcon className="w-5 mr-1" icon={faLocationDot} /></p>
                    {sagn.stedsnavn && <p>{sagn.stedsnavn } i&nbsp;</p>}
                    <p>{sagn.kommune.kommunenavnNorsk} {sagn.kommune.fylkesnavn && (", " + sagn.kommune.fylkesnavn)}</p>
                </div>
                <div className="flex flex-row w-full sm:w-auto">
                    <p ><FontAwesomeIcon className="w-5 mr-1" icon={faCalendar} /></p>
                    <p className="sm:ml-auto"> {sagn.happenedAt? new Date(sagn.happenedAt).toLocaleString() : "Ukjent"}</p>
                </div>
            </div>
            <CardTags tags={sagn.tags}/>          
            <div className="flex space-x-4">
                <p className="text-green-500 font-bold">Liker: {sagn.likes.length}</p>
                <p className="text-red-500 font-bold">Liker ikke: {sagn.dislikes.length}</p>
            </div>
            {/* {sagn.author?.email && <p className="">Author: {sagn.author.email}</p>} */}
            <p>Opplastet: {new Date(sagn.postedAt).toLocaleString("no")}</p>
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
        .collection(process.env.POST_COLLECTION!)
        .findOne({postId:Number(postId)})

        return {
            props: {sagn: JSON.parse(JSON.stringify(response))}
        };
    } catch (e) {
        console.error(e);
    }

}

export default SagnFullView