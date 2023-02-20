import { useContext, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { faArrowsUpDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sagn from '@/objects/Sagn';




const SortListBox = () => {
  const sortTypes:string[] = ['alphabetical','Alphabetical_Desc','Likes','Controversial','NewFirst','OldFirst']
  const sortType = [
    {id: 1, sType: sortTypes[0]},
    {id: 2, sType: sortTypes[1]},
    {id: 3, sType: sortTypes[2]},
    {id: 4, sType: sortTypes[3]},
    {id: 5, sType: sortTypes[4]},
    {id: 6, sType: sortTypes[5]},
  ]

  const [selectedSort, setSelectedSort] = useState(sortType[0])

  return (
    <Listbox as="div" value={selectedSort} by="id" onChange={setSelectedSort}
      className="w-44 py-1 rounded-md space-y-2 bg-primary-200 justify-center shadow-md border-[1px] border-black"
    >
      <Listbox.Button className="flex w-full items-center relative">
        <span className='px-2 truncate'>
          {selectedSort.sType}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <FontAwesomeIcon icon={faArrowsUpDown} className="h-10 w-10"/>
        </span>
      </Listbox.Button>
      <Listbox.Options className="flex flex-col w-44 absolute rounded-md bg-white shadow-md">
        {sortType.map((sort) => (
          <Listbox.Option 
            key={sort.id}
            value={sort}
            className="hover:bg-primary-100 hover:text-primary-900 ui-active:text-white ui-active ui-not-active:bg-white ui-not-active:text-black"
          >
          {({ selected }) => (
            <div className="relative cursor-default select-none py-2 pl-10 pr-4 overflow-hidden">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                { selected && <FontAwesomeIcon icon={faCheck} />}
              </span>
              <span className='truncate'>{sort.sType}</span>
            </div>
          )}
            
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default SortListBox