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

const HoriCard = (props: Props) => {

    return (
        <div className="w-full flex flex-col p-2 md:mx-0 bg-gray-100 rounded-md shadow-md text-textColor md:max-w-screen-lg space-y-2">
            <div className="flex flex-row justify-between w-full">
                <Link href={"/storyFullView"} className=" box-content text-xl font-semibold line-clamp-1 md:max-w-x">
                    {props.title} {props.title} {props.title} {props.title}
                </Link>
                <div className="flex-row space-x-3 hidden lg:flex">
                    <CardTags tags={props.tags}/>
                    <LikeDislikeButtons likes={props.likes} dislikes={props.dislikes}/>
                </div>
            </div>
            <p className="inline-block line-clamp-3"> {props.text} </p>
            <div className="flex flex-row-reverse space-x-reverse space-x-2 place-content-between p-2 lg:hidden">
                <LikeDislikeButtons likes={props.likes} dislikes={props.dislikes}/>
                <CardTags tags={props.tags}/>
            </div>
        </div>
    )
}

export default HoriCard