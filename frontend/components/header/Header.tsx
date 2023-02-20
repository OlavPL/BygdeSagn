import React, { useState} from 'react';
import Link from 'next/link';
import { FaUserAlt, FaPen} from "react-icons/fa";


const Header = () => {
	const [showMenu, setShowMenu] = useState(false);
  
	const handleClick = () => {
	  setShowMenu(!showMenu);
	};
	
	return (
	  <nav className="shadow-sm w-full z-10">
		
		  <div className="flex items-center h-14 w-full bg-gray-900">
			<div className="flex items-center mx-10 justify-between w-full">
			  
			  <div className="flex justify-center items-center flex-shrink-0 ">
				<h1 className="font-bold text-xl cursor-pointer">
				  Boop<span className="text-blue-500">App</span>
				</h1>
			  	</div>
			  
			 		<div className="">
						<div className="ml-10 flex items-baseline space-x-8 ">
							<FaPen className = "text-4xl hover:bg-blue-500 w-8 h-8 cursor-pointer"/>
							<FaUserAlt onClick={handleClick} className = "text-4xl hover:bg-blue-600 rounded-full w-8 h-8 cursor-pointer"/>
							<div
								className={`origin-top-right absolute right-0 mt-14 w-40 rounded-md shadow-lg  bg-white ${
								showMenu ? "block" : "hidden"
								}`}
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="menu-button">
								<div className="py-2" role="none">
									<Link href="#" className="px-2 py-2 text-sm block" role="menuitem" id="menu-item-1">
									Link 1
									</Link>
									<Link href="#" className="px-2 py-2 text-sm block" role="menuitem" id="menu-item-2">
									Link 2
									</Link>
									<button
										type="submit"
										className="block w-full text-left px-2 py-2 rounded-md font-medium hover:bg-blue-600"
										role="menuitem"
										id="menu-item-3">
										Link 3
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		
	</nav>
	);
  };
  

export default Header