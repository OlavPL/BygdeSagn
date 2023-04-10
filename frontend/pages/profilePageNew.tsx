import React from 'react';
import {useSession,signOut,getSession} from 'next-auth/react'
import Image from 'next/image';



  

const profilePageNew =()=> {

    const{data:session}=useSession()


    const picstring=():string=>{
        if(session){
          if(session.user?.image==null){
            return("https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-user-circle-thin.png")
          }
          return session.user?.image!
        }
        else{ return "https://cdn.icon-icons.com/icons2/2036/PNG/512/menu_circular_button_burger_icon_124214.png"}  
      }

    return(
    <div className="shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-full max-w-[550px] flex-col items-center bg-cover bg-clip-border p-[16px]">
        <div className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover">
            <div className="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
                <Image src={picstring()} className="h-full w-full rounded-full" alt="" width={40} height={0}/> 
            </div>
        </div>
        <div className="mt-16 flex flex-col items-center">
            <h4 className="text-bluePrimary text-xl font-bold">John Ivar</h4>
            <p className="text-lightSecondary text-base font-normal w-80">lorem lorem orem lorem orem lorem orem lorem orem lorem orem lorem orem loremorem lorem </p>
        </div>
        <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
            <div className="flex flex-col items-center justify-center">
            <h3 className="text-bluePrimary text-2xl font-bold">17</h3>
            <p className="text-lightSecondary text-sm font-normal">Posts</p>
            </div>
            <div className="flex flex-col items-center justify-center">
            <h3 className="text-bluePrimary text-2xl font-bold">9</h3>
            <p className="text-lightSecondary text-sm font-normal">Comments</p>
            </div>
            <div className="flex flex-col items-center justify-center">
            <h3 className="text-bluePrimary text-2xl font-bold">2023</h3>
            <p className="text-lightSecondary text-sm font-normal">Joined</p>
            </div>
        </div>
    </div>
    )
}

export default profilePageNew