import Link from "next/link"

interface Tags{
tags: String[]
}

const CardTags = (tags: Tags) =>{
    var tagArr: String[] = tags.tags
    if (tags.tags.length > 3){
        tagArr = [tags.tags[0], tags.tags[1]]
    }

    return(
        <div className = "flex flex-row space-x space-x-2">
            {tagArr.map((tag, index) => {
                return(
                <div key={index}  className="rounded bg-yellow self-center">
                    <p className="bg-yellow-300 rounded-full p-2 border-2 border-slate-500">{tag}</p>
                </div>
            )})}

            {tags.tags.length > 3 &&
                <div className="rounded bg-yellow self-center">
                    <p className="bg-yellow-300 rounded-full p-2 px-4 border-2 border-slate-500 hover:" onClick={openTags} >{"..."}</p>
                </div>
            }
        </div>
    )
}

function openTags() {

}

export default CardTags