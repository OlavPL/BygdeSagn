import Head from 'next/head'

import Card_fortelling from '@/components/LoreCard/Card_fortelling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import SortListBox from '@/components/LoreCard/SortListBox';
import Sagn from '@/objects/Sagn';
import DisplaySagas from '@/components/DisplaySagas';
import { SagnModel } from '@/ViewModel/SagnModel';

library.add(fas)

interface IndexProps {
  sagnModel: SagnModel
}

const Home = ({ sagnModel }: IndexProps) => (
  <div className="bg-gradient-to-b from-plantation-200 to-primary-200 min-h-screen flex flex-col items-center text-textColor">

    <div className="pt-10 space-y-2">
      <form className='space-y-2 '>
        <div className='flex  outline-2 bg-primary-200 focus-within:outline outline-blue-500 rounded'>
          <span className="p-2 rounded rounded-r-none border-r-0 border-[1px] border-black"> 
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          <input className="grow rounded-l-none bg-primary-200 focus:outline-none border-l-0 border-[1px] border-black rounded placeholder-textColor " placeholder='Søk på sted...'/>
        </div>
        <div className='flex flex-row space-x-2'>
            <SortListBox/> 
        </div>
      </form>
      <div className="text-3xl font-bold mb-10">
        Welcome to Bygdehistorie ™
      </div>
    </div>


    <div className="w-full  mt-5">
      <h2 className="text-lg font-bold text-center">
        Most Popular News
      </h2>
      <DisplaySagas sagnModel={sagnModel} />
    </div>
  
  </div>
);

export default Home;