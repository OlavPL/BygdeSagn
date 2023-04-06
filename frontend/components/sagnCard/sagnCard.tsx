import { Tag } from "@/types/tag"
import CardTags from "./cardTags"
import LikeDislikeButtons from "./likeDislikeButtons"
import AppUser from "@/types/AppUser"
import Sagn from "@/objects/sagn"

interface Props {
    sagn: Sagn
    updateSagn: (postID: number) => void
}

const SagnCard = ({sagn, updateSagn}: Props) => {
    // console.log(`"User: " ${likes[0].email}`)

    return (
        <div className="w-full flex flex-col p-2 md:mx-0  bg-white rounded-md shadow-md text-textColor space-y-2">
            <div className="flex flex-row justify-between w-full">
                {/* <Link href={"/storyFullView"} className=" box-content text-xl font-semibold line-clamp-1 md:max-w-x text-textColor">
                </Link> */}
                <h1 className="font-semibold text-lg">
                    {sagn.title}
                </h1>
                <div className="flex-row space-x-3 hidden lg:flex">
                    <CardTags tags={sagn.tags}/>
                    <LikeDislikeButtons likes={sagn.likes} dislikes={sagn.dislikes} postID = {sagn.postID} updateSagn={updateSagn}/>
                </div>
            </div>
            <p className="inline-block line-clamp-3"> {sagn.text} </p>
            <div className="flex flex-row-reverse space-x-reverse space-x-2 place-content-between p-2 lg:hidden">
                <LikeDislikeButtons likes={sagn.likes} dislikes={sagn.dislikes} postID = {sagn.postID} updateSagn={updateSagn}/>
                <CardTags tags={sagn.tags}/>
            </div>
        </div>
    )
}

export default SagnCard