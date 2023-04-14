import React, { useContext, useEffect, useState } from 'react';
import {useSession,signOut,getSession} from 'next-auth/react'
import Image from 'next/image';
import { AppContext } from "@/pages/_app"
import SagnListController, { SortTypes } from '@/components/controller/sagnListController';
import Sagn from '@/objects/sagn';
import DisplayUserSagn from '@/components/Sagn/displayUserSagne';
import exp from 'constants';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const ProfilePageNew = ()=> {
  const{data:session}=useSession({required:true})
  const user= session?.user
  const [expended, setExpanded] = useState(false)
  const [count, setCount] = useState(0)
  const [comments,setComments]=useState(0)
  const [liked,setLiked]=useState(0)

  const handleClick = () => setExpanded(!expended)
  

  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await fetch(
          `/api/post/getUserPosts?email=${session?.user?.email}`
        );
        const data = await res.json()
        setCount(data.length)
      } catch (error) {
        console.log(error)
      }
    }
      
    getCount()
    const getComment= async () => {
      try {
        const res = await fetch(
          `/api/post/getUserPosts?email=${session?.user?.email}`
        );
        const data = await res.json()
        setComments(data.length)
      } catch (error) {
        console.log(error)
      }
    }
      
    getComment();
    const getLiked= async () => {
      try {
        const res = await fetch(
          `/api/post/likes/getUserLikedPosts?email=${session?.user?.email}`
        )
        const data = await res.json()
        setLiked(data.length)
      } catch (error) {
        console.log(error)
    }
  }   
  getLiked()
  }, [session])

  const picstring=():string=>{
    if(session){
      if(session.user?.image==null){
        return("https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-user-circle-thin.png")
        }
        return session.user?.image!
      }
        else{return "https://cdn.icon-icons.com/icons2/2036/PNG/512/menu_circular_button_burger_icon_124214.png"}  
      }
     
      const [sagnListController, setListController] = useState(new SagnListController([]))
      const [list, setList] = useState([] as Sagn[])
      const [isLoading, setLoading] = useState(false)
      const {title, setTitle} = useContext(AppContext)
  
      const updateList = (e: SortTypes) =>{
          setList(sagnListController.sortSagn(e))
      }
  
      useEffect(() => {
          setLoading(true)
          fetch(`/api/post/getUserPosts?email=${session?.user?.email}`)
          .then((res) => res.json())
          .then((data) => {
              console.log(data)
              let slc = new SagnListController(data)
              setListController(slc)
              setList(slc.sortSagn(slc.sortType.type))
              setLoading(false)
          })
          
          setTitle("ProfilePage")
        }
        , [session?.user?.email, setTitle])  
        // , [setTitle])  
    
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
          <p className="text-lightSecondary text-sm font-normal">Posts</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h3 className="text-bluePrimary text-2xl font-bold">{comments}</h3>
          <p className="text-lightSecondary text-sm font-normal">Comments</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h3 className="text-bluePrimary text-2xl font-bold">{liked}</h3>
          <p className="text-lightSecondary text-sm font-normal">Liked Posts</p>
        </div>
      </div>

      <div className="mt-5 mx-auto content-center">
        <div className="flex flex-col md:max-w-screen-lg justify-center">
        <h2 className="text-lg font-bold text-center cursor-pointer text-blue-600 hover:text-primary-200 transition-all duration-300 ease-in-out" onClick={handleClick}>
          <FontAwesomeIcon icon={expended ? faAngleUp : faAngleDown} />
          Nyeste Innlegg
        </h2> 
          {expended && (
              <DisplayUserSagn sagnList={list} className="mt-5" />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePageNew


