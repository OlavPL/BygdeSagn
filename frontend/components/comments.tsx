import { useState } from "react"

const Comment =()=> {
    const [showComment, setShowComment] = useState(false)
    
    const comments = [
        'Olav liker hest',
        'Hesten liker Olav',
        'Liker hest Olav?',
        'Hest Olav liker',
    ]


    const handleClick =()=> {
        setShowComment(!showComment)
    }

    return(
        <div className="w-full max-w-md mx-auto">
            <button className = "bg-emphasis-50 rounded-xl p-2 shadow-md ml-auto border border-gray-500 hover:bg-emphasis-200 rounded"
                    onClick = {handleClick}
            >
                {showComment ? 'Skjul kommentar' : 'Vis kommentar'}
            </button>

            {showComment && (
                <ul className="mt-4 space-y-4 text-lg">
                    {comments.map((comments, index) => (
                        <li key={index} className="p-2 bg-gray-100 rounded shadow-md">    
                            {comments}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Comment