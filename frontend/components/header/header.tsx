import React, { useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCookie, faPen, faRightFromBracket, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '@/pages/_app';
import {useSession, signOut} from 'next-auth/react'
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header = () => {
  // useState variabel som viser/gjemmer menu
  const [showMenu, setShowMenu] = useState(false)
  const {title} = useContext(AppContext)
  const{data:session}=useSession()
  // useRef som kommuniserer med DOM direkte
  const menuButtonRef = useRef<HTMLImageElement>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  // Toggler vis / gjem menu
  const handleClick = () =>  setShowMenu(!showMenu)
  const handleLogout = () => {
    router.push("/#")
    signOut()
  }
  
  const picstring= ():string=>{
    if(session){
      if(session.user?.image==null){
        return("https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-user-circle-thin.png")
      }
      return session.user?.image!
    }
    else{ return "https://cdn.icon-icons.com/icons2/2036/PNG/512/menu_circular_button_burger_icon_124214.png"}  
  }
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(
        showMenu &&
        event.target instanceof Node &&
        !menuButtonRef.current?.contains(event.target) &&
        !menuContainerRef.current?.contains(event.target)
      ){
        setShowMenu(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu])
  
  return (
    <nav className="relative">
        <div className="flex flex-col items-center h-20 w-full ">
          <div className="flex items-center mx-4 justify-between w-full">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 w-60">
              <Link href="/">
                <div className="font-bold text-4xl cursor-pointer">
                <span className="text-primary-90 ">Bygde</span><span className="drop-shadow-md text-primary-400">Sagn</span>
                </div>
              </Link>
            </div>
          
            <div className="text-2xl text-center font-bold hidden sm:block">
                {title}
            </div>

            
            <div className="flex items-center space-x-8 w-50 justify-end mx-2 mt-1">
              { session ?
                <Link href={"/createSagn"} className='hidden md:block'>
                  {/*Nytt sagn knapp*/}
                  <button className="items-center space-x-1 font-medium text-textColor hover:text-primary-900 focus:outline-none bg-primary-200 hover:bg-primary-400 rounded-md px-4 py-1.5">
                    <FontAwesomeIcon icon={faPen} className="text-2xl w-6 h-6 cursor-pointer transition-colors duration-100 ease-in-out fa-lg" />
                    <span className="text-lg underline">Nytt Sagn</span>
                  </button>
                </Link>
                :
                  <Link href={"/login"} className='hidden md:block'>
                    {/*Logg inn knapp*/}
                    <button className="items-center space-x-1 font-medium text-textColor focus:outline-none bg-primary-300 hover:bg-primary-400 rounded-md px-4 py-1.5">
                      <span className="text-lg ">Logg inn</span>
                    </button>
                  </Link>
              }
          
              {/* Bruker profil knapp m/ icon */}
              <Image src={picstring()} alt="" onClick = {handleClick} ref={menuButtonRef} width={40} height={0} className="rounded-full cursor-pointer mr-2"/>
              <div
                ref={menuContainerRef}
                // handleClick gir videre event til onChange som en håndterer. 
                // Funksjonen blir kalt på hver gang useState menuButtonRef blir trykket på. 
                onClick = {handleClick}
                className={`origin-top-right absolute right-0 top-2 mt-14 w-40 rounded-md shadow-lg bg-white menu-container z-10 ${
                  showMenu ? 'block' : 'hidden'
                }`}
                role="menu"
                aria-labelledby="menu-button"
              >
                <div className="padd relative overflow-hidden rounded" role="none" >
                
                  {session && 
                    <Link href={"../profilePage"} className="block hover:bg-primary-200">
                      <button className="flex items-center space-x-1 font-medium text-textColor focus:outline-none rounded-md px-4 py-1.5">
                        <FontAwesomeIcon icon={faUser} className="text-2xl w-6 h-6 cursor-pointer ease-in-out fa-lg" />
                        <span className="text-lg underline">Profil</span>
                      </button>
                    </Link>
                  }
                  <Link href={"createSagn"} className = "block md:hidden hover:bg-primary-200">
                    <button className="flex items-center space-x-1 font-medium  focus:outline-none rounded-md px-4 py-1.5">
                      <FontAwesomeIcon icon={faPen} className="text-2xl w-6 h-6 cursor-pointer ease-in-out fa-lg" />
                      <span className="text-lg underline">Nytt Sagn</span>
                    </button>
                  </Link>
                  <Link href="/cookies" className="block hover:bg-primary-200">
                    <button className="flex items-center space-x-1 font-medium text-textColor focus:outline-none rounded-md px-4 py-1.5">
                      <FontAwesomeIcon icon={faCookie} className="text-2xl w-6 h-6 cursor-pointer ease-in-out fa-lg" />
                      <span className="text-lg underline">Cookies</span>
                    </button>
                  </Link>
                  <Link href="/aboutUs" className="block hover:bg-primary-200">
                    <button className="flex items-center space-x-1 font-medium text-textColor focus:outline-none rounded-md px-4 py-1.5">
                      <FontAwesomeIcon icon={faUsers} className="text-2xl w-6 h-6 cursor-pointer ease-in-out fa-lg" />
                      <span className="text-lg underline">Om oss</span>
                    </button>
                  </Link>
                                    
                  {session ?
                    (
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-1 font-medium hover:bg-red-400 w-full focus:outline-none rounded-md px-4 py-1.5"
                        role="menuitem"
                        id="menu-item-logout"
                      >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-2xl w-6 h-6 cursor-pointer transition-colors ease-in-out fa-lg" />
                        <span className="text-lg underline">Logout</span>
                      </button>
                    ) 
                      :
                    (
                      <Link href="/login" className="block hover:bg-primary-200" role="menuitem" id="menu-item-login">
                        <button className="flex items-center space-x-1 font-medium focus:outline-none rounded-md px-4 py-1.5">
                          <FontAwesomeIcon icon={faRightFromBracket} className="text-2xl w-6 h-6 cursor-pointer transition-colors ease-in-out fa-lg" />
                          <span className="text-lg underline">Logg inn</span>
                        </button>
                      </Link>
                      
                    )
                  }
                </div>
              </div>   
            </div>
          </div>

          <div className="flex items-center h-20 w-full sm:hidden">
            <div className="text-2xl text-center font-bold w-full">
                {title}
            </div>
          </div>
        </div>
    </nav>
  )
}

export default Header