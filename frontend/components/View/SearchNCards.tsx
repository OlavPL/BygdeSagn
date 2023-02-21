import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DisplaySagas from "../DisplaySagas"
import SortListBox from "../LoreCard/SortListBox"
import SagnListController, { SortTypes } from "../Controller/SagnListController"
import { useEffect, useState } from 'react'

const SearchNCards = () => {
    const sagnListController = new SagnListController()
    const [list, setList] = useState(sagnListController.sortSagn(SortTypes.LIKES))

    const updateList = (e: SortTypes) =>{
        console.log(sagnListController.sortSagn(e))
        setList(sagnListController.sortSagn(e))
    }

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col items-center text-textColor">

        <div className="pt-10 space-y-2">
        <form className='space-y-2 '>
            <div className='flex  outline-2 bg-primary-200 focus-within:outline outline-blue-500 rounded'>
            <span className="p-2 rounded rounded-r-none border-r-0 border-[1px] border-black"> 
                <FontAwesomeIcon icon={faLocationDot} />
            </span>
            <input className="grow rounded-l-none bg-primary-200 focus:outline-none border-l-0 border-[1px] border-black rounded placeholder-textColor " placeholder='Søk på sted...'/>
            </div>
            <div className='flex flex-row  space-x-2 '>
                <SortListBox sagnListController={sagnListController} list={list} updateList={updateList}/>
            </div>
        </form>
        <div className="text-3xl font-bold  mb-10">
            Welcome to Bygdehistorie ™
        </div>
        </div>


        <div className="w-full  mt-5">
        <h2 className="text-lg font-bold text-center">
            Most Popular News
        </h2>
            <DisplaySagas sagnList={list} />
        </div>
    
        </div>
    )
}

export default SearchNCards