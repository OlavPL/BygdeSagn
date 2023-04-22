// PostComment.tsx
import React, { ChangeEvent } from 'react';

interface PostCommentProps {
  userText: string;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
}

const PostComment: React.FC<PostCommentProps> = ({
  userText,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <div className="mt-4">
      <textarea
        className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline whitespace-pre-wrap break-words resize-none"
        placeholder="Skriv melding ..."
        required maxLength={200}
        value={userText}
        onChange={handleInputChange}
        rows={3}
    ></textarea>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  )
}

export default PostComment;
