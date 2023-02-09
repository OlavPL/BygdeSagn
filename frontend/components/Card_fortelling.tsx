import Link from "next/link"
import CardTags from "./CardTags"

interface Props {
    title: String,
    text: String,
    tags: String[],
    likes: number,
    dislikes: number,

}

const CardFortelling = (props: Props) => {

    return (
        <div className="flex flex-col mx-3 bg-gray-100 rounded-md shadow-md text-black md:max-w-md sm:max-w-xl sm:mx-auto">
            <div className="p-2">
                <Link href={"/storyFullView"} className=" box-content text-3xl underline text-blue-600 font-semibold line-clamp-2">
                    {props.title}
                </Link>
            </div>
            <p className="inline-block p-2 line-clamp-4 ">
                {props.text}
            </p>
            <div className="flex flex-row-reverse space-x-reverse space-x-2 place-content-between p-2">
                <div className="">
                    <button className="w-20 p-2 hover:bg-blue-400 rounded-l-full border-2 border-slate-500">Likes: {props.likes}</button>
                    <button className="w-20 p-2 hover:bg-blue-400 rounded-r-full border-2 border-l-0 border-slate-500">Disl: {props.dislikes}</button>
                </div>
                
                <CardTags tags={props.tags}/>
            </div>
        </div>
    )
}

export default CardFortelling