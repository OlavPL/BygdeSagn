import { useState } from "react"
import PostComment from './postComment'

const Comment =()=> {
    const [showComment, setShowComment] = useState(false)
    const [userText, setUserText] = useState('')
    const [texts, setTexts] = useState([
        'Text 1',
        'Text 2',
        'Text 3',
        'Text 4',
      ])

    const handleClick =()=> {
        setShowComment(!showComment)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserText(event.target.value)
    }
    
    const handleSubmit = () => {
        if (userText) {
            setTexts([...texts, userText])
            setUserText('')
        }
    }

    return(
        <div className="flex flex-col justify-start">
            <button className = "bg-emphasis-50 rounded-xl p-2 shadow-md ml-auto border border-gray-500 hover:bg-emphasis-200 rounded"
                onClick = {handleClick}
            >
                {showComment ? 'Skjul kommentar' : 'Vis kommentar'}
            </button>

            {showComment && (
                <>
                    <PostComment
                        userText={userText}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                    <ul className="mt-4 space-y-4 text-lg">
                        {texts.map((texts, index) => (
                            <li key={index} className="p-2 bg-gray-100 rounded shadow-md">    
                                {texts}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

export default Comment