import { useContext, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { faArrowRight, faArrowsUpDown, faCheck, faSortAmountAsc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SagnListController, { SortTypes } from './controller/sagnListController';
import { SortValue } from './controller/sagnListController';

interface Props{
  sagnListController: SagnListController
  updateList: (e: SortTypes) => void
  className?: string
}

const SagnSortListBox = ({sagnListController, updateList, className}: Props ) => {
  const [selected, setSelected] = useState(sagnListController.sortType)
  
  const handleChange = (e: SortValue) =>{
    setSelected(e)
    updateList(e.type)
  }


  return (
    <Listbox as="div" value={selected} by="id" onChange={(e:SortValue) => {handleChange(e)}}
      className={`${className} w-44 py-1 rounded-md space-y-2 bg-primary-100 justify-center shadow-md z-1  hover:bg-primary-400`}
    >
      <Listbox.Button className="flex w-full items-center relative">
        <span className='px-2 truncate'>
          {selected.type}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <FontAwesomeIcon icon={faSortAmountAsc} className="h-10 w-10"/>
        </span>
      </Listbox.Button>

      <Listbox.Options className="flex flex-col w-44 absolute rounded-md bg-white shadow-md">
        {sagnListController.sortObjects.map((sort) => (
          <Listbox.Option 
            key={sort.id}
            value={sort}
            className="hover:bg-primary-50 hover:text-primary-900 ui-active:text-white ui-active ui-not-active:bg-white ui-not-active:text-black"
          >

          {({ selected }) => (
            <div className="relative cursor-default select-none py-2 pl-10 pr-4 overflow-hidden">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                { selected && <FontAwesomeIcon icon={faArrowRight} /> }
              </span>
              <span className='truncate'>{sort.type}</span>
            </div>
          )}

          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default SagnSortListBox