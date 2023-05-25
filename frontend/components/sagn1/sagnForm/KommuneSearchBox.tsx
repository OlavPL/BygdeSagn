import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { Kommune } from '@/types/kommune'

interface KommuneSearchBoxI{
    kommuner: Kommune[]
    className?:string
    selectedKommune?: Kommune
    handleChange: (kommune:Kommune) => void
}

const KommuneSearchBox =  ( { kommuner, className, selectedKommune, handleChange }:KommuneSearchBoxI ) => {
  const [query, setQuery] = useState('')

  const handleSelect = (e: string) =>{    
    let selected = kommuner.find(kommune => kommune.kommunenavnNorsk == e)
    if(selected != undefined)
      handleChange( selected ) 
  }

  // Filtrerer kommune-valgalternativene basert på brukerinput
  const filteredKommuner =
    query === ''
    ? kommuner
    : kommuner.filter((kommune) => {
        return kommune.kommunenavnNorsk.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <div className={`${className} "w-52"`}>
      <label className="pointer-events-none -top-1 -left-1 transition-all scale-100 px-1 bg-emphasis-100">
        Kommune <span className="text-red-500"> *</span>
      </label>

      <Combobox as={"div"} value={selectedKommune? selectedKommune.kommunenavnNorsk : ""} onChange={handleSelect} className={" relative "}>
        <Combobox.Input onChange={(event) => setQuery(event.target.value)}  className={"m-0 rounded p-1"} />
        <Combobox.Options className={"absolute w-52 top-9 rounded-md bg-white shadow-md overflow-y-auto max-h-52"}>
          {filteredKommuner.map((kommune, index) => (
            <Combobox.Option key={kommune.kommunenummer+index} value={kommune.kommunenavnNorsk} 
            className={"p-1 hover:bg-primary-50 hover:text-primary-900 ui-active:text-white ui-active ui-not-active:bg-white ui-not-active:text-black z-100"}
            >
              {kommune.kommunenavnNorsk}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  )
}

export default KommuneSearchBox