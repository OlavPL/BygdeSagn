import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowsUpDown } from "@fortawesome/free-solid-svg-icons"
import { Popover } from "@headlessui/react"
import { Tag, tagList } from "@/types/tag"

interface Tags{
    tags: Tag[]
}

const CardTags = ({tags}: Tags) =>{
    var tagArr: String[] = tags
    if (tags.length > 3){
        tagArr = [tags[0], tags[1]]
    }

    return(
        <div className = "flex flex-row space-x space-x-2 text-textColor font-semibold">
            {tagArr.map((tag, index) => {
                return(
                <div key={index}  className="self-center place-center">
                    <p className="bg-emphasis-300 rounded text-justify px-1 ">{tag}</p>
                </div>
            )})}

            {tags.length > 3 &&
                <Popover className="relative rounded bg-emphasis-300 self-center">
                <Popover.Button>
                    <p className=" p-1 flex hover:cursor-pointer" >
                        <FontAwesomeIcon icon={faArrowsUpDown} className="h-7 w-5"/>
                    </p>
                </Popover.Button>
          
                <Popover.Panel className="absolute z-10 bg-emphasis-100 rounded p-1 drop-shadow-xl">
                  <div className="flex flex-col ">
                    {tagList.map((tag) => {
                        return <a key={tag} >{tag}</a>
                    })}
                  </div>
                </Popover.Panel>
              </Popover>
            }
        </div>
    )
}

export default CardTags