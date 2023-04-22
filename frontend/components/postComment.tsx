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
    <div className="mt-4 relative">
      <textarea
        className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline whitespace-pre-wrap break-words resize-none"
        placeholder="Skriv melding ..."
        required maxLength={500}
        value={userText}
        onChange={handleInputChange}
        rows={4}
        
      ></textarea>
     
      <div className="absolute bottom-0 right-0 mb-3 mr-3 text-xs text-gray-400">
        {userText.length}/500
      </div>
      
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
