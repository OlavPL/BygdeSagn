import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import PostComment from './postComment';

interface CommentData {
  text: string;
  user: {
    name: string;
    email: string;
    postedAt: string;
  }
}

interface CommentsProps {
  comments?: CommentData[],
  _id: string
}

const Comment = (props: CommentsProps) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState<CommentData[]>([]);
  const { data: session } = useSession();

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
  }, [props._id]);

  const handleToggleComment = () => {
    setShowComment(!showComment);
  }

  return(
    <div className="flex flex-col w-full">
      <button className="bg-emphasis-50 rounded-xl p-2 shadow-md ml-auto border border-gray-500 hover:bg-emphasis-200 rounded" onClick={handleToggleComment}>
        {showComment ? 'Skjul kommentar' : 'Vis kommentar'}
      </button>

      {showComment && (
        <>
          <PostComment
              _id={props._id}
          />
          <ul className="mt-4 space-y-4 text-lg">
            {(comments || []).map((comment: CommentData, index: number) => (
              <li key={index} className="p-2 bg-gray-100 rounded shadow-md break-words">
                <span className="text-gray-500 mr-2">{comment.user.postedAt}</span>
                <br/>
                {comment.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Comment;
