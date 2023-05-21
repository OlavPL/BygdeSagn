import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import PostComment from './postComment';
import { Comment } from '@/types/comment';


interface CommentsProps {
  comments: Comment[];
  _id: string;
}

const Comment = (props: CommentsProps) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState<Comment[]>(props.comments);
  const { data: session } = useSession();

  async function fetchComments() {
    const response = await fetch(`/api/post/Post?_id=${props._id}`, {
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
  useEffect(() => {
    // fetchComments();
  }, [props._id]);

  const handleToggleComment = () => {
    setShowComment(!showComment);
  };

  const handleDeleteComment = async (commentId: string) => {
    const response = await fetch(`/api/post/comments/comment?postId=${props._id}&commentId=${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        setComments(comments.filter(comment => comment._id !== commentId));
        fetchComments();
    } else {
        console.log(response);
    }
};

  return(
    <div className = "flex flex-col w-full">
      <button className = "bg-emphasis-50 rounded-xl p-2 shadow-md ml-auto border border-gray-500 hover:bg-emphasis-200" onClick={handleToggleComment}>
        {showComment ? 'Skjul kommentar' : 'Vis kommentar'}
      </button>

      {showComment && (
        <>
          <PostComment 
              _id = {props._id}
              fetchComments={fetchComments}
          />
          <ul className = "mt-4 space-y-4 text-lg">
            {(comments || []).map((comment: Comment, index: number) => (
              <li key={index} className="flex flex-col p-2 bg-gray-100 rounded shadow-md break-words">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{comment.owner}</span>
                  <span>{format(new Date(comment.postedAt), 'dd.MM.yyyy')}</span>
                </div>
                <span>{comment.text}</span>
                {session?.user?.name === comment.owner && (
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
