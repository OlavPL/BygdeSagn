import LikeIcon from "@/public/LikeIcon.png"
import DislikeIcon from "@/public/DislikeIcon.png"
import Image from "next/image"

interface Props {
    likes: number,
     dislikes: number
}

const LikeDislikeButtons = (props: Props) =>{
return (
<div className="flex flex-row">
    <div className="flex flex-row w-20 py-2 place-content-evenly self-center hover:bg-blue-400 rounded-l-full border-2 border-slate-500">
        <Image className={"ml-3"} src={LikeIcon} title={"Finger icons by Gregor Cresnar - Flaticon"}alt={"LikeIcon"} width={20} height={20} ></Image>
        <div className=" text-center px-2 ">{props.likes}</div>
    </div>
    <div className="flex flex-row w-20 py-2 place-content-evenly self-center hover:bg-blue-400 rounded-r-full border-l-0 border-2 border-slate-500">
        <Image className={"ml-3"} src={DislikeIcon} title={"Finger icons by Gregor Cresnar - Flaticon"} alt={"DislikeIcon"} width={20} height={20} ></Image>
        <div className=" text-center px-2 ">{props.dislikes}</div>
    </div>
</div>
)

}

export default LikeDislikeButtons