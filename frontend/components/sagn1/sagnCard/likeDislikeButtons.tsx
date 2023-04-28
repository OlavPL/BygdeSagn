import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons"
import {useSession, signIn, signOut,getSession} from 'next-auth/react'
import { Session, User } from "next-auth";
import AppUser from "@/types/AppUser";
import { useEffect, useState } from "react";
import { ToastOptions, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastType, getToastOptions } from "@/components/controller/toastController";

interface Props {
    likes: AppUser[]
    dislikes: AppUser[]
    _id: string
    className?: string
}

const LikeDislikeButtons = ({likes, dislikes, _id, className}: Props) =>{
    const [_likes, setLikes] = useState<AppUser[]>(likes)
    const [_dislikes, setDislikes] = useState<AppUser[]>(dislikes)
    const [userLikeStatus, setUserLikeStatus] = useState<number>()
    const session = useSession();

    useEffect(() => {
        if(userLikeStatus === undefined){
            let hasInteracted = false
            likes.forEach(like => {
                if(like.email === session.data?.user?.email){
                    hasInteracted = true
                    setUserLikeStatus(1)
                }
            })
            if(hasInteracted === false){
                dislikes.forEach(dislike => {
                    if(dislike.email === session.data?.user?.email){
                        hasInteracted = true
                        setUserLikeStatus(-1)
                    }
                })
            }
        }

        setLikes(likes)
        setDislikes(dislikes)
    }, [dislikes, likes, session.data?.user?.email, userLikeStatus])
    
    
    const addLike = async () => {
        if(session.data == null ){
            toast.error("Dette krever å være innlogget", getToastOptions(ToastType.light, "loginToInteract") );
            return
        }
            
        const options:RequestInit={
            headers:{'Content-Type':'application/json',},
            method:'PUT',
            body:JSON.stringify({
                "_id": _id,
                "user" : {
                    name: session.data.user?.name,
                    email: session.data.user?.email
                } as AppUser
            }),
        }
        await fetch("/api/post/likes/like",options).catch()
        .then((res)=>{
            if(res.status === 200)
                setUserLikeStatus(1)
            else if(res.status === 201)
                setUserLikeStatus(0)
        })

        await fetch(`/api/post/Post?_id=${_id}`).catch()
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
            
        let options:RequestInit={
            headers:{'Content-Type':'application/json',},
            method:'PUT',
            body:JSON.stringify({
                "_id": _id,
                "user" : {name: session.data.user?.name, email: session.data.user?.email} as AppUser
            }),
        }
        await fetch("/api/post/likes/dislike",options).catch()
        .then((res)=>{
            if(res.status === 200)
                setUserLikeStatus(-1)
            else if(res.status ===201)
                setUserLikeStatus(0)
        })
        
        await fetch(`/api/post/Post?_id=${_id}`).catch()
        .then((res) => res.json())
        .then((data) => {
            setLikes(data.likes)
            setDislikes(data.dislikes)
        })
    }

    return (
    <div className={`flex flex-row ${className}`} >
        <button onClick={addLike} className="flex flex-row w-20 py-1 place-content-center self-center hover:bg-primary-200 rounded-l-full border-2 border-slate-500">
            <FontAwesomeIcon 
                icon={faThumbsUp} 
                className={`ml-3 fa-lg ${userLikeStatus! > 0 ? "text-primary-500" : "text-textColor"}`} 
            />
            <div className=" text-center px-2 ">{_likes.length}</div>
        </button>
        <button onClick={addDislike} className="flex flex-row w-20 py-1 place-content-center self-center hover:bg-red-200 rounded-r-full border-l-0 border-2 border-slate-500">
            <FontAwesomeIcon 
                icon={faThumbsDown} 
                className={`fa-lg place-self-end ${userLikeStatus! < 0 ? "text-emphasis-600" : "text-textColor"}`} 
            />
            <div className=" text-center px-2 ">{_dislikes.length}</div>
        </button>
    </div>
    )
}

export default LikeDislikeButtons