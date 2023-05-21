import React, { useContext, useEffect, useState } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import Image from 'next/image';
import { AppContext } from '@/pages/_app';
import SagnListController, { SortType } from '@/controllers/sagnListController';
import Sagn from '@/objects/sagn';

import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import DisplayUserSagn from '@/components/sagn1/displayUserSagn';
import { ToastType, getToastOptions } from '@/controllers/toastController';
import { toast } from 'react-toastify';
import router from 'next/router';

const ProfilePageNew = () => {
  const { data: session } = useSession({ required: true });
  const user = session?.user;
  const [expanded, setExpanded] = useState(false);
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState(0);
  const [liked, setLiked] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleClick = () => setExpanded(!expanded);
  //Antall Sagn lagt ut av en bruker
  const getPostCount = async () => {
    try {
      const res = await fetch(`/api/post/getUserPosts?email=${user?.email}`);
      const data = await res.json();
      setCount(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  //Antall kommentarer gjort av en bruker
  const getComment = async () => {
    try {
      const res = await fetch(`/api/post/comments/getUserComments?name=${user?.name}`);
      const data = await res.json();
      setComments(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  //Antall likes gjort av en bruker
  const getLiked = async () => {
    try {
      const res = await fetch(`/api/post/likes/getUserLikedPosts?email=${user?.email}`);
      const data = await res.json();
      setLiked(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteUser = async () => {    
    try {
      const email = session?.user?.email  
      const response = await fetch('/api/user', {
        method: 'DELETE',
        body: JSON.stringify({ "email":email}),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      if (response.ok) {
        await router.push('/');
        await  signOut()
        
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  //Oppdaterer antall likes, kommentarer og posts som blir vist som tall til brukeren
  useEffect(() => {
    getPostCount();
    getComment();
    getLiked();
  }, [user]);

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`/api/post/Post?_id=${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        const toastOptions = getToastOptions(ToastType.light, "sagn deleted");
        toast.success("Sagn Slettet", toastOptions);
        getPostCount();
        getComment();
        getLiked();
        setList((prevList) => prevList.filter((sagn) => sagn._id !== _id));
      } else {
        console.error("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
    const toastOptions = getToastOptions(ToastType.light, "sagn deleted");
    toast.success("Sagn Slettet", toastOptions);
    router.push("/profilePage");
  };
  
//Henter profil bilde fra google / dersom det ikke blir brukt en google bruker så blir det satt til et standard bilde
  const picstring = (): string => {
    if (session) {
      if (session.user?.image == null) {
        return 'https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-user-circle-thin.png';
      }
      return session.user?.image!;
    } else {
      return 'https://cdn.icon-icons.com/icons2/2036/PNG/512/menu_circular_button_burger_icon_124214.png';
    }
  };

  const [sagnListController, setListController] = useState(new SagnListController([]));
  const [list, setList] = useState([] as Sagn[]);
  const [isLoading, setLoading] = useState(false);
  const { title, setTitle } = useContext(AppContext);

  const updateList = (e: SortType) => {
    setList(sagnListController.sortSagn(list,e));
  };

  useEffect(() => {
    setLoading(true);
    
  
    fetch(`/api/post/getUserPosts?email=${session?.user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        let slc = new SagnListController(data);
        setListController(slc);
        setList(slc.sortSagn(slc.sagnList, slc.sortType));
        setLoading(false);
        setTitle("ProfilSide")
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [session?.user?.email, setTitle, setListController]);
  

    
  return(
    <div className="shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-full max-w-[550px] flex-col items-center bg-cover bg-clip-border p-[16px]">
      <div className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover">
        <div className="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
          <Image src={picstring()} className="h-full w-full rounded-full" alt="" width={40} height={0}/> 
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-bluePrimary text-xl font-bold">{user?.name}</h4>
      </div>
      
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-bluePrimary text-2xl font-bold">{count} </h3>
          <p className="text-lightSecondary text-sm font-normal">publiserte Sagn</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h3 className="text-bluePrimary text-2xl font-bold">{comments}</h3>
          <p className="text-lightSecondary text-sm font-normal">Kommentarer</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h3 className="text-bluePrimary text-2xl font-bold">{liked}</h3>
          <p className="text-lightSecondary text-sm font-normal">likte Sagn</p>
        </div>
      </div>

      <div className="mt-5 mx-auto content-center">
        <div className="flex flex-col md:max-w-screen-lg justify-center">
        <h2 className="text-lg font-bold text-center cursor-pointer text-link hover:text-primary-200 transition-all duration-300 ease-in-out select-none" onClick={handleClick}>
          <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} />
          Dine Innlegg
        </h2> 
          {expanded && (
            list.length === 0 ? <p> Du har ikke publisert noen sagn enda</p> :
            <DisplayUserSagn sagnList={list} className="mt-5" onDelete={handleDelete} />
          )}
        </div>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded mt-5 ml-auto"
        onClick={() => setShowConfirmation(true)}
      >
        Slett bruker
      </button>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-md p-6">
            <p className="text-xl mb-4">Er du sikker på at du vil slette brukeren din?</p>
            <p className="text-gray-600 mb-4">Denne handlingen kan ikke tilbake stilles og brukeren vil bli permanent slettet.</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded mr-2"
                onClick={() => setShowConfirmation(false)}
              >
                Avbryt
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                onClick={handleDeleteUser}
              >
                Slett bruker
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProfilePageNew


