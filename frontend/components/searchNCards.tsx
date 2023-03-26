import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DisplaySagn from "./displaySagn"
import SortListBox from "./sagnCard/sortListBox"
import SagnListController, { SortTypes } from "./controller/sagnListController"
import { useState, useEffect, useContext } from 'react'
import Sagn from "@/objects/sagn"
import { AppContext } from "@/pages/_app"

const SearchNCards = () => {
    const [sagnListController, setListController] = useState(new SagnListController([]))
    const [list, setList] = useState([] as Sagn[])
    const [isLoading, setLoading] = useState(false)
    const {title, setTitle} = useContext(AppContext);
    setTitle("Velkommen til Bygdesagn ™")

    const updateList = (e: SortTypes) =>{
        setList(sagnListController.sortSagn(e))
    }

    useEffect(() => {
        setLoading(true)
        fetch('/api/post/getPosts')
        .then((res) => res.json())
        .then((data) => {
            let slc = new SagnListController(data)
            setListController(slc)
            setList(slc.sortSagn(slc.sortType.type))
            setLoading(false)
        })
      }
      , [])

    return (
        <div className="w-full flex flex-col items-center text-textColor">

            <div className="pt-10 space-y-2 relative" >
                <form className='space-y-2 '>
                    <div className='flex  outline-2 bg-primary-100 focus-within:outline outline-blue-500 shadow-lg rounded w-96'>
                        <span className="p-2 rounded rounded-r-none border-r-0"> 
                            <FontAwesomeIcon icon={faLocationDot} />
                        </span>
                        <input className="grow rounded-l-none bg-primary-100 focus:outline-none border-l-0 rounded placeholder-textColor " placeholder='Søk på sted...'/>
                    </div>
                    <div className='flex flex-row  space-x-2'>
                        <SortListBox sagnListController={sagnListController} updateList={updateList}/>
                    </div>
                </form>

            </div>

            <div className="w-full  mt-5">
                <h2 className="text-lg font-bold text-center">
                    Nyeste Innlegg
                </h2>
                <DisplaySagn sagnList={list} />
            </div>

        </div>
    )
}
export default SearchNCards