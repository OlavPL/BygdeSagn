import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import PostComment from './postComment';
import { Comment } from '@/types/comment';
import { Session } from 'next-auth';

// Definerer properties for komponentet
interface CommentsProps {
  comments: Comment[];
  _id: string;
  session: Session
}

const Comment = ({comments, _id, session}: CommentsProps) => {
  // useState variabler som skjuler kommentarer by default.
  // Hvis en bruker trykker på hvis kommentar, vil denne useState bli initialisert. 
  const [showComment, setShowComment] = useState(false); 
  const [commentList, setComments] = useState<Comment[]>(comments)
  // Skjuler kommentarer
  const handleToggleComment = () => {
    setShowComment(!showComment)
  }

  // const { data: session } = useSession();

  async function fetchComments() {
    const response = await fetch(`/api/post/Post?_id=${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
  
    if (data.comments === undefined || data.comments === null) {
      setComments([]);
    } else {
      setComments(data.comments);
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    const response = await fetch(`/api/post/comments/comment?postId=${_id}&commentId=${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        setComments(commentList.filter(comment => comment._id !== commentId));
        fetchComments();
    } else {
        console.log(response);
    }
};
  {/* Rendrer kommentar */}
  return(
    <div className = "flex flex-col w-full">
      {/* Knapp som har en boolsk useState med en tekst som sier: Skjul kommentarer / Vis kommentarer*/}
      <button className = "bg-emphasis-50 rounded-xl p-2 shadow-md ml-auto border border-gray-500 hover:bg-emphasis-200" onClick={handleToggleComment}>
        {showComment ? 'Skjul kommentarer' : 'Vis kommentarer'}
      </button>
      {/* Viser postet kommentarer. 
        * Looper (map) gjennom alle kommentarer og rendrer dem i en liste
        * med navn på avsender og dato den ble publisert
        */}
      {showComment && (
        <>
          <PostComment 
              _id = {_id}
              fetchComments={fetchComments}
          />
          <ul className = "mt-4 space-y-4 text-lg">
            {(commentList || []).map((comment: Comment, index: number) => (
              <li key={index} className="flex flex-col p-2 bg-gray-100 rounded shadow-md break-words">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{comment.owner}</span>
                  <span>{format(new Date(comment.postedAt), 'dd.MM.yyyy')}</span>
                </div>
                <span>{comment.text}</span>
                {/* Hvis bruker er innlogget og har kommentert på sagn så kan de slette kommentarer direkte i sagn hvis de er comment.owner */}
                {session?.user?.email === comment.owner && (
                <button
                  className="mt-2 text-sm font-medium text-red-500 ml-auto"
                  onClick={() => {
                    if (window.confirm('Er du sikker på at du vil slette meldingen?')) {
                      handleDeleteComment(comment._id);
                    }
                  }}
                >
                  Slett
                </button>
              )}
            </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}


export default Comment
