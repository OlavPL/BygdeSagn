import { Tag } from "@/types/tag"
import Link from "next/link"
import CardTags from "./cardTags"
import LikeDislikeButtons from "./likeDislikeButtons"
import { Router, useRouter } from "next/router"
import Sagn from "@/objects/sagn"

interface Props {
    title: String,
    text: string,
    tags: string[],
    likes: number,
    dislikes: number,
    sagn: Sagn

}

const SagnCard = ({title, text, tags, likes, dislikes, sagn}: Props) => {

    return (
        <div className="w-full flex flex-col p-2 md:mx-0  bg-white rounded-md shadow-md text-textColor space-y-2">
            <div className="flex flex-row justify-between w-full">
                <Link href={`/post/${encodeURIComponent(sagn.postId)}`} className=" box-content text-xl font-semibold line-clamp-1 md:max-w-x text-textColor">
                <h1 className="font-semibold text-lg">
                    {title}
                </h1>
                </Link>
                <div className="flex-row space-x-3 hidden lg:flex">
                    <CardTags tags={tags}/>
                    <LikeDislikeButtons likes={likes} dislikes={dislikes}/>
                </div>
            </div>
            <p className="inline-block line-clamp-3"> {text} </p>
            <div className="flex flex-row-reverse space-x-reverse space-x-2 place-content-between p-2 lg:hidden">
                <LikeDislikeButtons likes={likes} dislikes={dislikes}/>
                <CardTags tags={tags}/>
            </div>
        </div>
    )
}

export default SagnCard