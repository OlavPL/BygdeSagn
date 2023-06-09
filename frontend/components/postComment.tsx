import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { ToastType, getToastOptions } from '@/controllers/toastController';
import { filterBadWords } from '@/controllers/automod';
import Link from 'next/link';

// Definerer properties for komponentet
interface PostCommentProps {
  _id: string;
  fetchComments: () => void;
}

const PostComment: React.FC<PostCommentProps> = ({_id, fetchComments}) => {
  const [userText, setUserText] = useState("") // Holder på teksten som er skrevet av en bruker
  const [postingCOmment, setPostingComment] = useState(false) // Sporer om en kommentar blir postet
  const session = useSession()
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Håndterer input change i textarea. 
  // event: ChangeEvent<HTMLTextAreaElement> oppdaterer state av textarea.
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(event.target.value)
  }

  // Håndterer textarea click events og utvider textarea fra 1 row til 4 rows når trykket på
  const handleClick = () => {
    if (textareaRef.current) {
      textareaRef.current.rows = 4;
      textareaRef.current.classList.add('border-blue-500'); // Når utvidet = blå border
      textareaRef.current.classList.remove('border-black'); // Når utvidet = fjerner svart border
    }
  };


  // Validerer publiserings forspørsel om sagn av bruker. Feil ved for lite tekst i tittel/ body eller mangel på session
  const handleSubmit = async () => {
    if(postingCOmment)
      return
    if (!session.data?.user) {
      toast.error("Du må være logget inn for å legge til en kommentar", getToastOptions(ToastType.light, "not logged in"));
      return;
    }
  
    if (userText.length < 1) {
      toast.error("Du må først skrive en kommentar", getToastOptions(ToastType.light, "field missing"));
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
        toast.success("Kommentar publisert", toastOptions);
        fetchComments();
      }
      if (!response.ok) {
        const toastOptions = getToastOptions(ToastType.light, "Comment posted error");
        toast.success("Kunne ikke publisere kommentar", toastOptions);
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
  
  // Rendrer postComments
  return (
    <>
      <div className="mt-4 relative">
      { session.status === "authenticated" ? (
        <>
          {/* textarea som er default på 1 rad, hvis trykket på (handleClick) utvidet til 4 rader. 
              Textarea har maks lengde på 500 tegn.
          */}
          <textarea
            className="shadow-md appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline whitespace-pre-wrap break-words resize-none 
            focus:border-blue-500 focus:ring-1 border-black"
            placeholder="Skriv melding ..."
            required maxLength={500}
            value={userText}
            rows = {1}
            ref={textareaRef}
            // handleInputchange gir videre event til onChange som en håndterer. 
            // Funksjonen blir kalt på hver gang endringer blir gjort i textarea. 
            onChange={handleInputChange} 
            onClick={handleClick}
          ></textarea>

          <div className="flex justify-end items-center mt-2">
            <div className="text-center mr-3 text-xs text-gray-600">
              {userText.length}/500
            </div>
            {/* Kjører funksjon handleSubmit */}
            <button
              className="bg-secondary-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </>
      ):
      <div>
        {/* Hvis ikke i session (innlogget) vil du få indikasjon på at du ikke skrive kommentarer */}
        <p className='text-center '> Du må være logget inn for å skrive kommentar. 
        <br/>Klikk<Link href={"/login"} className='text-blue-500 font-semibold'> her </Link>for å logge inn</p>
      </div>
    }
    </div>
    </>
  )
}

export default PostComment;
