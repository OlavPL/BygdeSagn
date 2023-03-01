import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons"

interface Props {
    likes: number
    dislikes: number
}

const LikeDislikeButtons = ({likes, dislikes}: Props) =>{
return (
<div className="flex flex-row">
    <div className="flex flex-row w-20 py-1 place-content-center self-center hover:bg-primary-200 rounded-l-full border-2 border-slate-500">
    <FontAwesomeIcon icon={faThumbsUp} className={"ml-3 fa-lg"} width={20} height={10} />
        <div className=" text-center px-2 ">{likes}</div>
    </div>
    <div className="flex flex-row w-20 py-1 place-content-center self-center hover:bg-primary-200 rounded-r-full border-l-0 border-2 border-slate-500">
        <FontAwesomeIcon icon={faThumbsDown} className={"fa-lg place-self-end"} />
        <div className=" text-center px-2 ">{dislikes}</div>
    </div>
</div>
)

}

export default LikeDislikeButtons