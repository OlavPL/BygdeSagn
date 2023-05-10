import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons"
import {useSession, signIn, signOut,getSession} from 'next-auth/react'
import { Session, User } from "next-auth";
import AppUser from "@/types/AppUser";
import { useEffect, useState } from "react";
import { ToastOptions, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastType, getToastOptions } from "@/controllers/toastController";

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
    const [isLoading, setLoading] = useState(false)
    const session = useSession();

    useEffect( () => {
        const doSomehting = async () => {
            const data = await session.data?.user?.email
            let hasInteracted = false
            
        // if(userLikeStatus === undefined){
            likes.forEach(like => {
                if(like.email === data){
                    hasInteracted = true
                    setUserLikeStatus(1)
                }
            })

            if(hasInteracted === false){
                dislikes.forEach(dislike => {
                    if(dislike.email === data){
                        hasInteracted = true
                        setUserLikeStatus(-1)
                    }
                })
            // }
        }
            setLikes(likes)
            setDislikes(dislikes)
        }
        doSomehting()
            
    }, [dislikes, likes, session, userLikeStatus])
    
    
    const addLike = async () => {
        if(!isLoading) {
            setLoading(true)
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

            // Sender like request
            await fetch("/api/post/likes/like",options).catch()
            .then((res)=>{
                if(res.status === 200)
                    setUserLikeStatus(1)
                else if(res.status === 201)
                    setUserLikeStatus(0)
            })

            // Henter like og dislikes for å oppdatere visuellt. Skal slåes sammen med metoden over.
            await fetch(`/api/post/Post?_id=${_id}`).catch()
            .then((res) => res.json())
            .then((data) => {
                setLikes(data.likes)
                setDislikes(data.dislikes)
            })
            setLoading(false)
        }
    }
    const addDislike = async () => {
        if(!isLoading) {
            setLoading(true)
            if(session.data == null ){
                toast.error("Å like krever å være innlogget", getToastOptions(ToastType.light, "loginToInteract") );
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
            // Sender dislike request
            await fetch("/api/post/likes/dislike",options).catch()
            .then((res)=>{
                if(res.status === 200)
                    setUserLikeStatus(-1)
                else if(res.status ===201)
                    setUserLikeStatus(0)
            })
            
            // Henter like og dislikes for å oppdatere visuellt. Skal slåes sammen med metoden over.
            await fetch(`/api/post/Post?_id=${_id}`).catch()
            .then((res) => res.json())
            .then((data) => {
                setLikes(data.likes)
                setDislikes(data.dislikes)
            })
            setLoading(false)
        }
    }

    return (
    <div className={`flex flex-row ${className}`} >
        <button onClick={addLike} 
            className={`
                flex flex-row w-20 py-1 place-content-center self-center cursor-default
                ${session.status === "authenticated" ? "hover:bg-primary-200" : "bg-gray-200"}
                rounded-l-full border-2 border-slate-500
             `}
        >
            <FontAwesomeIcon 
                icon={faThumbsUp} 
                className={`ml-3 fa-lg ${userLikeStatus! > 0 ? "text-primary-500" : "text-textColor"}`} 
            />
            <div className=" text-center px-2 ">{_likes.length}</div>
        </button>
        <button onClick={addDislike} 
            className={`
                flex flex-row w-20 py-1 place-content-center self-center cursor-default
                ${session.status === "authenticated" ? "hover:bg-red-200" : "bg-gray-200"}
                rounded-r-full border-2 border-l-0 border-slate-500
            `}
        >
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