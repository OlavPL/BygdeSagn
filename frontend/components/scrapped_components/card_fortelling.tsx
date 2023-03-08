import Link from "next/link"
import CardTags from "../sagnCard/cardTags"
import LikeDislikeButtons from "../sagnCard/likeDislikeButtons"

interface Props {
    title: String,
    text: String,
    tags: String[],
    likes: number,
    dislikes: number,

}

const CardFortelling = (props: Props) => {

    return (
        <div className="flex flex-col md:mx-0 bg-gray-100 rounded-md shadow-md text-gray-800 md:max-w-m">
            <div className="p-2">
                <Link href={"/storyFullView"} className=" box-content text-3xl underline text-blue-600 font-semibold line-clamp-2">
                    {props.title}
                </Link>
            </div>
            <p className="inline-block px-2 line-clamp-4"> 
                {props.text}
            </p>
            <div className="flex flex-row-reverse space-x-reverse space-x-2 place-content-between p-2">
                <div className="flex flex-row">
                    <LikeDislikeButtons likes={props.likes} dislikes={props.dislikes}/>
                </div>
                
                <CardTags tags={props.tags}/>
            </div>
        </div>
    )
}

export default CardFortelling