import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { faLocationDot, faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const places = [
  { id: 1, name: 'Oslo', parent: 'Oslo' },
  { id: 2, name: 'Gjerstad', parent: 'Agder'},
  { id: 3, name: 'Bø', parent: 'Midt-telemark'},
  { id: 4, name: 'Trondheim', parent: 'Trøndelaga'},
  { id: 5, name: 'Vik', parent: 'Sogn',},
  { id: 5, name: 'Andebu', parent: 'Sandefjord',},
]

const LocationListBox = () => {
  const [selectedPerson, setSelectedPerson] = useState(places[0])

  return (
    <Listbox as="div" value={selectedPerson} onChange={setSelectedPerson} 
    className="w-56 py-1 rounded-md space-y-2 bg-primary-200 justify-center shadow-md">
      <Listbox.Button className="flex w-full items-center relative">
        <span className='px-2 truncate'>
          {selectedPerson.name}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <FontAwesomeIcon icon={faArrowsUpDown} className="h-10 w-10"/>
        </span>
        </Listbox.Button>
      <Listbox.Options className="flex flex-col w-56 absolute rounded-md bg-white shadow-md">
        {places.map((person) => (
          <Listbox.Option 
            key={person.id}
            value={person}
            className="hover:bg-primary-100 hover:text-primary-900 ui-active:text-white ui-active ui-not-active:bg-white ui-not-active:text-black"
          >
          {({ active, selected }) => (
            <div className="relative cursor-default select-none py-2 pl-10 pr-4 overflow-hidden">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {selected && <FontAwesomeIcon icon={faLocationDot} />}
              </span>
              <span className='truncate'>{person.name}, {person.parent}</span>
            </div>
          )}
            
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default LocationListBox