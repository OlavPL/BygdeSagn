import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { FaUserAlt, FaPen } from 'react-icons/fa';
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome';
import { faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '@/pages/_app';
import {useSession,signOut,getSession} from 'next-auth/react'
import Image from 'next/image';
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {title} = useContext(AppContext);
  const{data:session}=useSession();
  const handleClick = () => {
    setShowMenu(!showMenu);
  
  };
  const picstring=():string=>{
    if(session){

      if(session.user?.image==null){
        return("https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-user-circle-thin.png")
      }
      return session.user?.image!
    }
    else{ return "https://cdn.icon-icons.com/icons2/2036/PNG/512/menu_circular_button_burger_icon_124214.png"}  

  }
  
  return (
    <nav className=" w-full z-10">
      <div className="flex items-center h-20 w-full ">
        <div className="flex items-center mx-4 justify-between w-full">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 w-60">
            <Link href="/">
              <div className="font-bold text-4xl cursor-pointer">
              <span className="text-primary-90 ">Bygde</span><span className="drop-shadow-md text-primary-400">Sagn</span>
              </div>
            </Link>
          </div>

          <div className="text-3xl text-center font-bold">
            {title}
          </div>

        {/* Create Sagn Button */}
          <div className="flex items-baseline space-x-8 w-60 justify-end">
            <Link href={"/createSagn"}>
              <button className="flex items-center space-x-1 font-medium text-textColor hover:text-secondary-800 focus:outline-none bg-primary-200 hover:bg-primary-700 rounded-md px-4 py-1.5">
                <FontAwesomeIcon icon={faPen} className="text-2xl w-6 h-6 cursor-pointer transition-colors duration-200 ease-in-out fa-lg" />
                <span className="text-lg underline">Nytt Sagn</span>
              </button>
            </Link>

            {/* USer Button */}
            <Image src={picstring()} alt="" onClick={handleClick} width={40} height={0} className="rounded-full cursor-pointer"  />
            <div className={`origin-top-right absolute right-0 mt-14 w-40 rounded-md shadow-lg bg-white ${showMenu ? 'block' : 'hidden'}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
              <div className="py-2" role="none">
                  <Link href="/profilePage" className="px-2 py-2 text-sm block" role="menuitem" id="menu-item-profile">
                    Min Profil
                  </Link>
                  {/* <Link href="#" className="px-2 py-2 text-sm block" role="menuitem" id="menu-item-2">
                    link2
                  </Link> */}
                  <Link href="/login" className="px-2 py-2 text-sm block text-black hover:text-blue-250" role="menuitem" id="menu-item-3">
                    Login
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
