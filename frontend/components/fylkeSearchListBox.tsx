import { Dispatch, SetStateAction, useState } from 'react';
import { Combobox } from '@headlessui/react'
import { Kommune } from '@/types/kommune';
import { Fylke } from '@/types/fylke';
import { Stedsnavn } from '@/types/stedsnavn';


interface Props{
  handleChange: (e: Fylke|Kommune|Stedsnavn) => void
  fylkeList: Fylke[] 
  kommuneList: Kommune[] 
  stedsnavnList: Stedsnavn[]
  className?: string
  placeholder?: string
  query: string
  setQuery: (value: string) => void

}

const FylkeSortListBox = ({ handleChange, fylkeList, kommuneList, stedsnavnList, className, placeholder, query, setQuery}: Props ) => {
  const [selected, setSelected] = useState<(Fylke|Kommune|Stedsnavn)>()
  const [queriedPlaces, setQueriedPlaces] = useState(Array())

  const handleSelect = (e: any) =>{
    setSelected(e)
    setQuery(e.fylkenavn != undefined ? e.fylkenavn : (e.kommunenavnNorsk != undefined ? e.kommunenavnNorsk : e.stedsnavn))
    handleChange(e)
  }

  const updateQuery = (e: string) => {
    let filteredPlaces: (any)[] = Array<any>()
    const search = e.trimStart().toLowerCase()

    if(search.length < 1)
      return

    fylkeList.map(fylke => {
      if( fylke.fylkenavn.toLowerCase().includes(search) ){
        filteredPlaces.push(fylke)
      }
    })

    kommuneList.forEach(kommune => {
      if(kommune.kommunenavnNorsk.toLowerCase().includes(search)) 
      filteredPlaces.push(kommune)
    })

    stedsnavnList.forEach((sted:Stedsnavn) => {
      if(sted.stedsnavn.toLowerCase().includes(search)) 
      filteredPlaces.push(sted)
    })

    setQueriedPlaces(filteredPlaces)
  }

  return (
    <div className={`${className} "w-52"`}>
      <Combobox as={"div"} value={query} onChange={handleSelect} className={" relative "}>
        <Combobox.Input 
          placeholder={`${placeholder}`} 
          className={"m-0 rounded rounded-b-none p-1 pb-0 bg-primary-100 focus:outline-none border-b-[1px] border-black"} 
          onChange={(event) => updateQuery(event.target.value)}
        />
        <Combobox.Options className={"absolute w-52 top-9 rounded-md bg-white shadow-md overflow-y-auto max-h-52"}>
          {queriedPlaces.map((object:(any), index) => (
            <Combobox.Option key={index} value={object} 
            className={"p-1 hover:bg-primary-50 hover:text-primary-900 ui-active:text-white ui-active ui-not-active:bg-white ui-not-active:text-black z-100"}
            >
              {object.fylkenavn != undefined ? object.fylkenavn : (object.kommunenavnNorsk != undefined ? object.kommunenavnNorsk : object.stedsnavn)}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  )
}

export default FylkeSortListBox