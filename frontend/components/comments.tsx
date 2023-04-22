import { useState, useEffect } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import { format } from "date-fns";
import PostComment from './postComment';
import { comment } from 'postcss';

interface CommentsProps {
  comments?: string[],
  _id: string
}

const Comment = (props: any) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(`/api/post/Post?_id=${props._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      setComments(data.comments);
    }
    fetchComments();
  }, []);

  const handleClick = () => {
    setShowComment(!showComment);
  }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewComment(event.target.value)
    }
    
    const handleSubmit = () => {
        if (newComment) {
          setComments([...comments, newComment])
            setNewComment('')
        }
    }

    return(
        <div className="flex flex-col w-full">
            <button className = "bg-emphasis-50 rounded-xl p-2 shadow-md ml-auto border border-gray-500 hover:bg-emphasis-200 rounded"
                onClick = {handleClick}
            >
                {showComment ? 'Skjul kommentar' : 'Vis kommentar'}
            </button>
            
            {showComment && (
                <>
                    <PostComment
                        userText={newComment}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                    <ul className="mt-4 space-y-4 text-lg">
                        {comments.map((comments, index) => (
                            <li key={index} className="p-2 bg-gray-100 rounded shadow-md">  
                                {comments}
                                <span className="text-gray-500 mr-2">, { format(new Date(),'dd. MMMM /yy HH:MM')}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            
        </div>
      )}


export default Comment;
