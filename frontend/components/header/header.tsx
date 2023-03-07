import React, { useState } from 'react';
import Link from 'next/link';
import { FaUserAlt, FaPen } from 'react-icons/fa';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="shadow-sm w-full z-10">
      <div className="flex items-center h-20 w-full bg-primary-300">
        <div className="flex items-center mx-4 justify-between w-full">
          
          {/* Logo */}
          <div className="flex justify-center items-center flex-shrink-0">
            <Link href="/">
              <div className="font-bold text-4xl cursor-pointer">
                Bygde<span className="text-blue-500">Sagn</span>
              </div>
            </Link>
          </div>

        {/* Create Sagn Button */}
          <div className="ml-10 flex items-baseline space-x-8">
            <Link href={"/createSagn"}>
              <button className="flex items-center space-x-1 font-medium text-white hover:text-blue-500 focus:outline-none bg-blue-500 rounded-md px-4 py-1.5">
                <FaPen className="text-2xl w-6 h-6 cursor-pointer transition-colors duration-200 ease-in-out" />
                <span className="text-lg underline">Post</span>
              </button>
            </Link>


            {/* USer Button */}
            <FaUserAlt onClick={handleClick} className="text-4xl hover:text-white rounded-full w-8 h-8 cursor-pointer transition-colors duration-200 ease-in-out"/>
            <div className={`origin-top-right absolute right-0 mt-14 w-40 rounded-md shadow-lg  bg-white ${showMenu ? 'block' : 'hidden'}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
              <div className="py-2" role="none">
                  <Link href="/profilePage" className="px-2 py-2 text-sm block" role="menuitem" id="menu-item-profile">
                    Min Profil
                  </Link>
                  <Link href="#" className="px-2 py-2 text-sm block" role="menuitem" id="menu-item-2">
                    Link 2
                  </Link>
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
