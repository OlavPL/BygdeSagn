import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons"
import {useSession, signIn, signOut,getSession} from 'next-auth/react'
import { Session, User } from "next-auth";
import AppUser from "@/types/AppUser";

interface Props {
    likes: AppUser[]
    dislikes: AppUser[]
    postID: number
}


const LikeDislikeButtons = ({likes, dislikes, postID}: Props) =>{
    const session = useSession();
    
    const addLike = async () => {
        if(session.data != null){
            
            let userPresent = likes.find(user => user.email == session.data.user?.email)
            if(userPresent != undefined)
                return 
                
            // if(dislikes.length > 0){
            //     userPresent = dislikes.find(user => user.email == session.data.user?.email)
            //     if(userPresent != undefined ){
            //         removeLikeInteraction("Dislike")
            //     }
            // }
            if( dislikes.length > 0){
                userPresent =  dislikes.find(user => user.email == session.data.user?.email)
                if( userPresent != undefined ){
                    console.log("Remove ")
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
            const response = await fetch("/api/post/likes/addLike",options).catch()
        }
    }
    const addDislike = async () => {
        if(session.data != null){
            let userPresent = dislikes.find(user => user.email == session.data.user?.email)
            if(userPresent != undefined)
                return 
                
            if(likes.length > 0){
                userPresent = likes.find(user => user.email == session.data.user?.email)
                if(userPresent != undefined ){
                    console.log("Remove ")
                    await removeLikeInteraction("Like")
                }
            }
                
            const options:RequestInit={
                headers:{'Content-Type':'application/json',},
                method:'PUT',
                body:JSON.stringify({
                    "postId": postID,
                    "user" : {name: session.data.user?.name, email: session.data.user?.email} as AppUser
                }),
            }
            const response = await fetch("/api/post/likes/addDislike",options).catch()
        }
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
        await fetch(`/api/post/likes/remove${type}`,options).catch()
    }

    return (
    <div className="flex flex-row">
        <button onClick={addLike} className="flex flex-row w-20 py-1 place-content-center self-center hover:bg-emphasis-200 rounded-l-full border-2 border-slate-500">
            <FontAwesomeIcon icon={faThumbsUp} className={"ml-3 fa-lg"} width={20} height={10} />
            <div className=" text-center px-2 ">{likes.length}</div>
        </button>
        <button onClick={addDislike} className="flex flex-row w-20 py-1 place-content-center self-center hover:bg-emphasis-200 rounded-r-full border-l-0 border-2 border-slate-500">
            <FontAwesomeIcon icon={faThumbsDown} className={"fa-lg place-self-end"} />
            <div className=" text-center px-2 ">{dislikes.length}</div>
        </button>
    </div>
    )
}


export default LikeDislikeButtons