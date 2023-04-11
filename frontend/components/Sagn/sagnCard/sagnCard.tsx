import CardTags from "./cardTags"
import LikeDislikeButtons from "./likeDislikeButtons"
import Sagn from "@/objects/sagn"
import Link from "next/link"

interface Props {
    sagn: Sagn
}

const SagnCard = ({sagn}: Props) => {

    return (
        <div className="w-full flex flex-col p-2 md:mx-0  bg-white rounded-md shadow-md text-textColor space-y-2">
            <div className="flex flex-row justify-between w-full">
                <Link href={`/post/${encodeURIComponent(sagn.postId)}`} className=" box-content text-xl font-semibold line-clamp-1 md:max-w-x text-textColor">
                <h1 className="font-semibold text-lg">
                    {sagn.title}
                </h1>
                </Link>
                <div className="flex-row space-x-3 hidden lg:flex">
                    <CardTags tags={sagn.tags}/>
                    <LikeDislikeButtons likes={sagn.likes} dislikes={sagn.dislikes} postID = {sagn.postId}/>
                </div>
            </div>
            <p className="inline-block line-clamp-3"> {sagn.text} </p>
            <div className="flex flex-row-reverse space-x-reverse space-x-2 place-content-between p-2 lg:hidden">
                <LikeDislikeButtons likes={sagn.likes} dislikes={sagn.dislikes} postID = {sagn.postId}/>
                <CardTags tags={sagn.tags}/>
            </div>
        </div>
    )
}

export default SagnCard