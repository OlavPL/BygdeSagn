import Link from "next/link"
import CardTags from "../CardTags"
import LikeDislikeButtons from "../LikeDislikeButtons"

interface Props {
    title: String,
    text: String,
    tags: String[],
    likes: number,
    dislikes: number,

}

const HoriCard2Col = (props: Props) => {

    return (
        <div className="w-full flex flex-col p-2 md:mx-0 bg-gray-100 rounded-md shadow-md text-textColor md:max-w-screen-lg space-x-2">
            <Link href={"/storyFullView"} className=" box-content text-xl font-semibold line-clamp-1 md:max-w-x">
                {props.title} {props.title} {props.title} {props.title}
            </Link>
            <div className="flex flex-row place-content-between">
                <p className="inline-block line-clamp-3"> {props.text}</p>
                <div className="flex flex-col space-y-2 justify-center items-end">
                    <CardTags tags={props.tags}/>
                    <LikeDislikeButtons likes={props.likes} dislikes={props.dislikes}/>
                </div>
            </div>
        </div>
    )
}

export default HoriCard2Col