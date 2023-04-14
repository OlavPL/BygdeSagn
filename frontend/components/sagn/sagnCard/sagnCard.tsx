import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CardTags from "./cardTags"
import LikeDislikeButtons from "./likeDislikeButtons"
import Sagn from "@/objects/sagn"
import Link from "next/link"
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons"

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
            <div className="flex flex-col">
                <div className="flex flex-row font-semibold ">
                    <div className="flex flex-row w-full sm:w-auto">
                        <p ><FontAwesomeIcon className="w-5 mr-1" icon={faLocationDot} /></p>
                        {sagn.stedsnavn && <p>{sagn.stedsnavn } i&nbsp;</p>}
                        <p>{sagn.kommune.kommunenavnNorsk} {sagn.kommune.fylkesnavn && (", " + sagn.kommune.fylkesnavn)}</p>
                    </div>
                    <div className="flex flex-row w-full sm:w-auto">
                        <p ><FontAwesomeIcon className="w-5 mr-1" icon={faCalendar} /></p>
                        <p className="sm:ml-auto"> {sagn.happenedAt? sagn.happenedAt : "Ukjent"}</p>
                    </div>
                </div>
                <div className="flex flex-row-reverse place-content-between ">
                    <LikeDislikeButtons className={"ml-2"} likes={sagn.likes} dislikes={sagn.dislikes} postID = {sagn.postId}/>
                    <CardTags tags={sagn.tags}/>
                </div>
                <div className="flex flex-row w-full sm:w-auto">
                        <p ><FontAwesomeIcon className="w-5 mr-1" icon={faCalendar} /></p>
                        <p className="sm:ml-auto"> {sagn.owner? sagn.owner.name : "Ukjent"}</p>
                </div>
            </div>
        </div>
    )
}

export default SagnCard