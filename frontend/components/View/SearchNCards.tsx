import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DisplaySagn from "./displaySagn"
import SortListBox from "../LoreCard/sortListBox"
import SagnListController, { SortTypes } from "../Controller/SagnListController"
import { useState, useEffect } from 'react'
import Sagn from "@/objects/Sagn"

const SearchNCards = () => {
    let sagnListControllerr = new SagnListController([])
    const [sagnListController, setLi] = useState(new SagnListController([]))
    const [list, setList] = useState(sagnListController.sortSagn(SortTypes.LIKES))
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const updateList = (e: SortTypes) =>{
        console.log(sagnListController.sortSagn(e))
        setList(sagnListController.sortSagn(e))
    }

    useEffect(() => {
        setLoading(true)
        fetch('/api/post/getPosts')
          .then((res) => res.json())
          .then((data) => {
            setList(data)
            setLi(new SagnListController(data))
          })
      }
      , [])

    return (
        <div className="bg-gradient-to-b from-plantation-200 to-primary-200 min-h-screen flex flex-col items-center text-textColor">

        <div className="pt-10 space-y-2">
        <form className='space-y-2 '>
            <div className='flex  outline-2 bg-primary-200 focus-within:outline outline-blue-500 shadow-lg rounded w-96'>
                <span className="p-2 rounded rounded-r-none border-r-0"> 
                    <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <input className="grow rounded-l-none bg-primary-200 focus:outline-none border-l-0 rounded placeholder-textColor " placeholder='Søk på sted...'/>
            </div>
            <div className='flex flex-row  space-x-2 '>
                <SortListBox sagnListController={sagnListController} list={list} updateList={updateList}/>
            </div>
        </form>
        <div className="text-3xl font-bold  mb-10">
            Welcome to Bygdesagn ™
        </div>
        </div>


        <div className="w-full  mt-5">
        <h2 className="text-lg font-bold text-center">
            Most Popular News
        </h2>
            <DisplaySagn sagnList={list} />
        </div>

        </div>
    )
}
export default SearchNCards