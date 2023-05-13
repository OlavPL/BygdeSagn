import { useContext, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { faArrowRight, faArrowsUpDown, faCheck, faSortAmountAsc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SagnListController, { SortType, sortChoises } from '../controllers/sagnListController';

interface Props{
  sagnListController: SagnListController
  updateList: (e: SortType) => void
  className?: string
}

const SagnSortListBox = ({sagnListController, updateList, className}: Props ) => {
  const [selected, setSelected] = useState(sagnListController.sortType)
  
  const handleChange = (e: SortType) =>{
    setSelected(e)
    updateList(e)
  }


  return (
    <Listbox as="div" value={selected} by="id" onChange={(e:SortType) => {handleChange(e)}}
      className={`${className} w-44 py-1 rounded-md space-y-2 bg-primary-100 justify-center shadow-md z-1  hover:bg-primary-400`}
    >
      <Listbox.Button className="flex w-full items-center relative">
        <span className='px-2 truncate'>
          {selected}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <FontAwesomeIcon icon={faSortAmountAsc} className="h-10 w-10"/>
        </span>
      </Listbox.Button>

      <Listbox.Options className="flex flex-col w-44 absolute rounded-md bg-white shadow-md">
        {sortChoises.map((sort) => (
          <Listbox.Option 
            key={sort.id}
            value={sort.type}
            className="hover:bg-primary-50 hover:text-primary-900 ui-active:text-white ui-active ui-not-active:bg-white ui-not-active:text-black"
          >

            <div className="relative cursor-default select-none py-2 pl-10 pr-4 overflow-hidden">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                { sort.type === selected ? <FontAwesomeIcon icon={faArrowRight} /> : <></> }
              </span>
              <span className='truncate'>{sort.text}</span>
            </div>

          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default SagnSortListBox