import { useContext, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { faArrowsUpDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tag, tagList } from '@/types/tag';

interface Props{
  list: string[]
  onChange: (e: string) => void 
  className?: string
}

const TagsListBox = ({list, onChange, className}: Props) => {
  const [selected, setSelected] = useState(Tag.EPISK)
  
  const handleChange = (e: Tag) =>{
    setSelected(e)
  }


  return (
    <Listbox as="div" value={selected} by="id" onChange={(e:Tag) => {handleChange(e)}}
      className={`${className} w-44 m-auto p-2 rounded-md space-y-2 bg-primary-200 shadow-md relative`}
    >
      <Listbox.Button className="flex w-full items-center relative">
        <span className='px-2 truncate'>
          {selected}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <FontAwesomeIcon icon={faArrowsUpDown} className="w-10 fa-md"/>
        </span>
      </Listbox.Button>
      <Listbox.Options className="flex flex-col w-44 absolute left-[0px] top-9 rounded-md bg-white shadow-md">
        {tagList.map((tag, index) => (
          <Listbox.Option 
            key={index}
            value={tag}
            className="hover:bg-primary-100 my-auto hover:text-primary-900 ui-active:text-white ui-active rounded-md ui-not-active:bg-white ui-not-active:text-black"
          >
          {({ selected }) => (
            <div className="relative cursor-default select-none py-2 pl-10 pr-4 overflow-hidden">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                { selected && <FontAwesomeIcon icon={faCheck} />}
              </span>
              <span className='truncate'>{tag}</span>
            </div>
          )}
            
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default TagsListBox