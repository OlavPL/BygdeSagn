import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowsUpDown } from "@fortawesome/free-solid-svg-icons"

interface Tags{
tags: String[]
}

const CardTags = ({tags}: Tags) =>{
    var tagArr: String[] = tags
    if (tags.length > 3){
        tagArr = [tags[0], tags[1]]
    }

    return(
        <div className = "flex flex-row space-x space-x-2 text-textColor">
            {tagArr.map((tag, index) => {
                return(
                <div key={index}  className=" self-center place-center">
                    <p className="bg-secondary-300 rounded text-justify px-1">{tag}</p>
                </div>
            )})}

            {tags.length > 3 &&
                <div className="rounded bg-secondary-300 self-center">
                    <p className=" p-1 flex hover:cursor-pointer" onClick={openTags} >
                        <FontAwesomeIcon icon={faArrowsUpDown} className="h-7 w-5"/>
                    </p>
                </div>
            }
        </div>
    )
}

function openTags() {

}

export default CardTags