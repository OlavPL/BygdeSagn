import { useState, useEffect } from 'react';

const Comment = (props: any) => {
  interface CommentsProps {
    comments?: string[],
    _id: string
  }

  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(`/api/posts?_id=${props._id}`, {
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
  };

  const handleNewComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };



  return (
    <div className="mt-8">
      <button className="mb-4 text-gray-400" onClick={handleClick}>
        {showComment ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComment && (
        <div>
          <ul className="mt-4 space-y-4 text-lg">
            {comments.map((comment, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded shadow-md">
                {comment}
              </li>
            ))}
          </ul>
          
        </div>
      )}
    </div>
  );
};

export default Comment;
