// PostComment.tsx
import React, { ChangeEvent, useState } from 'react';

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

      <div className="flex justify-end items-center mt-2">
        <div className="text-center mr-3 text-xs text-gray-600">
          {userText.length}/500
        </div>
        
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default PostComment;
