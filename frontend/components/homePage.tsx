import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SortListBox from "./sagnSortListBox"
import SagnListController, { SortTypes } from "../controllers/sagnListController"
import { useState, useEffect, useContext } from 'react'
import Sagn from "@/objects/sagn"
import { AppContext } from "@/pages/_app"
import SagnCard from "./sagn1/sagnCard/sagnCard"

const HomePage = () => {
    const [sagnListController, setListController] = useState(new SagnListController([]))
    const [list, setList] = useState<Sagn[]>(Array())
    const [isLoading, setLoading] = useState(false)
    const {title, setTitle} = useContext(AppContext);

    const updateList = (e: SortTypes) =>{
        setList(sagnListController.sortSagn(e))
    }

    useEffect(() => {
        setLoading(true)
        fetch('/api/post/Post')
        .then((res) => res.json())
        .then((data) => {
            let slc = new SagnListController(data)
            setListController(slc)
            setList(slc.sortSagn(slc.sortType.type))
            setLoading(false)
        })
        
        setTitle("Velkommen til Bygdesagn ™")
      }
      , [setTitle])

    return (
        <div className="w-full flex flex-col items-center text-textColor">
            <div className="pt-10 space-y-2 relative hidden" >
                <div className='flex  outline-2 bg-primary-100 focus-within:outline outline-blue-500 shadow-lg rounded w-80'>
                    <span className="p-2 rounded rounded-r-none border-r-0"> 
                        <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <input className="grow rounded-l-none bg-primary-100 focus:outline-none border-l-0 rounded placeholder-textColor " placeholder='Søk på sted...'/>
                </div>
            </div>

            <div className="mt-5 mx-auto content-center w-full sm:w-auto ">
                <div className="flex flex-col sm:min-w-[600px] md:min-w-[668px] md:max-w-screen-lg justify-center">
                    <h2 className="text-lg font-bold text-center">
                        Nyeste Innlegg
                    </h2>
                    <SortListBox className= "place-self-end" sagnListController={sagnListController} updateList={updateList}/>
                    <div className={`flex flex-col w-full mt-3 p-2 gap-3 sm:gap-x-5 items-center `}>
                        {list.map((sagn: Sagn, index) => (
                            <SagnCard
                                sagn={sagn}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default HomePage