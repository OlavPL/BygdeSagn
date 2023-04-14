import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons"
import {useSession, signIn, signOut,getSession} from 'next-auth/react'
import { Session, User } from "next-auth";
import AppUser from "@/types/AppUser";
import { useState } from "react";
import { ToastOptions, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastType, getToastOptions } from "@/components/controller/toastController";

interface Props {
    likes: AppUser[]
    dislikes: AppUser[]
    postID: number
    className?: string
}

const LikeDislikeButtons = ({likes, dislikes, postID, className}: Props) =>{
    const [_likes, setLikes] = useState<AppUser[]>(likes)
    const [_dislikes, setDislikes] = useState<AppUser[]>(dislikes)
    const session = useSession();
    
    const addLike = async () => {
        if(session.data == null ){
            toast.error("Dette krever å være innlogget", getToastOptions(ToastType.light, "loginToInteract") );
            return
        }
            
        let userIsPresent = _likes.find(user => user.email == session.data.user?.email)
        if(userIsPresent != undefined)
            return 
            
        if( _dislikes.length > 0){
            userIsPresent =  _dislikes.find(user => user.email == session.data.user?.email)
            if( userIsPresent != undefined ){
                await removeLikeInteraction("Dislike")
            }
        }
            
        const options:RequestInit={
            headers:{'Content-Type':'application/json',},
            method:'PUT',
            body:JSON.stringify({
                "postId": postID,
                "user" : {
                    name: session.data.user?.name,
                    email: session.data.user?.email
                } as AppUser
            }),
        }
        await fetch("/api/post/likes/addLike",options).catch()

        await fetch(`http://localhost:3000/api/post/getPost?postId=${postID}`).catch()
        .then((res) => res.json())
        .then((data) => {
            setLikes(data.likes)
            setDislikes(data.dislikes)
        })
    }
    const addDislike = async () => {
        if(session.data == null ){
            toast.error("Dette krever å være innlogget", getToastOptions(ToastType.light, "loginToInteract") );
            return
        }

        let userPresent = _dislikes.find(user => user.email == session.data.user?.email)
        if(userPresent != undefined)
            return 
            
        if(_likes.length > 0){
            userPresent = _likes.find(user => user.email == session.data.user?.email)
            if(userPresent != undefined ){
                await removeLikeInteraction("Like")
            }
        }
            
        let options:RequestInit={
            headers:{'Content-Type':'application/json',},
            method:'PUT',
            body:JSON.stringify({
                "postId": postID,
                "user" : {name: session.data.user?.name, email: session.data.user?.email} as AppUser
            }),
        }
        await fetch("/api/post/likes/addDislike",options).catch()
        
        await fetch(`http://localhost:3000/api/post/getPost?postId=${postID}`).catch()
        .then((res) => res.json())
        .then((data) => {
            setLikes(data.likes)
            setDislikes(data.dislikes)
        })
    }

    const removeLikeInteraction = async (type: string) => {
        const options:RequestInit={
            headers:{
                'Content-Type':'application/json',
            },
            method:'PUT',
            body:JSON.stringify({
                "postId": postID,
                "user" : {name: session?.data?.user?.name, email: session?.data?.user?.email} as AppUser
            }),
        }
        const response = await fetch(`/api/post/likes/remove${type}`,options).catch()
    }

    return (
    <div className={`flex flex-row ${className}`} >
        <button onClick={addLike} className="flex flex-row w-20 py-1 place-content-center self-center hover:bg-emphasis-200 rounded-l-full border-2 border-slate-500">
            <FontAwesomeIcon icon={faThumbsUp} className={"ml-3 fa-lg"} width={20} height={10} />
            <div className=" text-center px-2 ">{_likes.length}</div>
        </button>
        <button onClick={addDislike} className="flex flex-row w-20 py-1 place-content-center self-center hover:bg-emphasis-200 rounded-r-full border-l-0 border-2 border-slate-500">
            <FontAwesomeIcon icon={faThumbsDown} className={"fa-lg place-self-end"} />
            <div className=" text-center px-2 ">{_dislikes.length}</div>
        </button>
    </div>
    )
}

export default LikeDislikeButtons