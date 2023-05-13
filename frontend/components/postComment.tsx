import { useSession } from 'next-auth/react';
import router from 'next/router';
import React, { ChangeEvent, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { ToastType, getToastOptions } from '@/controllers/toastController';
import { filterBadWords } from '@/controllers/automod';
import Link from 'next/link';
interface PostCommentProps {
  _id: string;
  fetchComments: () => void;
}

const PostComment: React.FC<PostCommentProps> = ({_id, fetchComments}) => {
  const [userText, setUserText] = useState("")
  const [postingCOmment, setPostingComment] = useState(false)
  const session = useSession()
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(event.target.value)
  }

  const handleClick = () => {
    if (textareaRef.current) {
      textareaRef.current.rows = 4;
      textareaRef.current.classList.add('border-blue-500');
      textareaRef.current.classList.remove('border-black');
    }
  };


  const handleSubmit = async () => {
    if(postingCOmment)
      return
    if (!session.data?.user) {
      toast.error("Du må være logget inn for å legge til en kommentar", getToastOptions(ToastType.light));
      return;
    }
  
    if (userText.length < 1) {
      toast.error("Du må først skrive en kommentar", getToastOptions(ToastType.light));
      return;
    }
  
    try {
      setPostingComment(true)
      const url = `/api/post/comments/comment/`;
      const options: RequestInit = {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({ "_id": _id, comment: { text: filterBadWords(userText), user: { name: session.data?.user?.name, email: session.data?.user?.email } } }),
      };
        
      const response = await fetch(url, options);
        
      if (response.ok) {
        const toastOptions = getToastOptions(ToastType.light, "Comment posted");
        toast.success("Comment posted", toastOptions);
        fetchComments();
      }
      if (!response.ok) {
        const toastOptions = getToastOptions(ToastType.light, "Comment not posted");
        toast.success("Comment not posted", toastOptions);
        throw new Error(`Failed to post comment: ${response.statusText}`);
      }
        
      setUserText("");
    } catch (error) {
      console.error(`Failed to post comment`);
    }
    finally{      
      setPostingComment(false)
    }
  };
  
  
  return (
    <>
        <div className="mt-4 relative">
    { session.status === "authenticated" ? 
      (
        <>
        <textarea
          className="shadow-md appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline whitespace-pre-wrap break-words resize-none 
          focus:border-blue-500 focus:ring-1 border-black"
          placeholder="Skriv melding ..."
          required maxLength={500}
          value={userText}
          rows = {1}
          ref={textareaRef}
          onChange={handleInputChange}
          onClick={handleClick}
        ></textarea>
        <div className="flex justify-end items-center mt-2">
          <div className="text-center mr-3 text-xs text-gray-600">
            {userText.length}/500
          </div>
          <button
            className="bg-secondary-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
        </>
      )
      
      :
      <div>
        <p className='text-center '> Du må være logget inn for å skrive kommentar. 
        <br/>Klikk<Link href={"/login"} className='text-blue-500 font-semibold'> her </Link>for å logge inn</p>
      </div>
    }
    </div>
    </>
  )
  
}

export default PostComment;
