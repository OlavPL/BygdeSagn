import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CardTags from "./cardTags"
import LikeDislikeButtons from "./likeDislikeButtons"
import Sagn from "@/objects/sagn"
import Link from "next/link"
import { faCircleUser,faClock,faLocationDot, } from "@fortawesome/free-solid-svg-icons"

interface Props {
    sagn: Sagn
}

const SagnCard = ({sagn}: Props) => {
    return (
        <div className="w-full flex flex-col p-2 md:mx-0 bg-white rounded-md shadow-md text-textColor space-y-2 md:max-w-screen-lg">
            <div className="flex flex-row justify-between w-full">
                <Link href={`/post/${encodeURIComponent(sagn._id)}`} className=" box-content text-xl font-semibold line-clamp-1 text-textLink">
                    <h1 className="font-semibold text-lg">{sagn.title}</h1>
                </Link>
                <div className="flex-row space-x-3 hidden md:flex">
                    <CardTags tags={sagn.tags} minimize={true}/>
                    <LikeDislikeButtons likes={sagn.likes} dislikes={sagn.dislikes} _id = {sagn._id}/>
                </div>
            </div>
            <p className="inline-block line-clamp-3"> {sagn.text} </p>
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-row ">
                    { sagn.happenedAt && 
                        <div className="flex flex-row mr-5">
                            <p ><FontAwesomeIcon className="w-5 mr-1 text-primary-600" icon={faClock} /> År:&nbsp;</p>
                            <p className=""> {sagn.happenedAt? sagn.happenedAt : "Ukjent"}</p>
                        </div>
                    }
                    <div className="flex flex-row">
                        <p ><FontAwesomeIcon className="w-5 mr-1 text-emphasis-600" icon={faLocationDot} /></p>
                        {sagn.stedsnavn && <p>{sagn.stedsnavn } i&nbsp;</p>}
                        <p>{sagn.kommune.kommunenavnNorsk} {sagn.kommune.fylkesnavn && (", " + sagn.kommune.fylkesnavn)}</p>
                    </div>
                </div>

                <div className="flex flex-row w-auto md:ml-auto">
                    <p ><FontAwesomeIcon className="w-5 mr-1" icon={faCircleUser} /></p>
                    <p > {sagn.owner? sagn.owner.name : "Ukjent"}</p>
                </div>
                
                <div className="flex flex-row-reverse place-content-between md:hidden ">
                    <LikeDislikeButtons className={"ml-2"} likes={sagn.likes} dislikes={sagn.dislikes} _id = {sagn._id}/>
                    <CardTags tags={sagn.tags} minimize={true}/>
                </div>
            </div>
        </div>
    )
}

export default SagnCard