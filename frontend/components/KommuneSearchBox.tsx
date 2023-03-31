import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import Kommune from '@/types/Kommune'

interface FylkeSearchBoxI{
    kommuner: Kommune[]
    // className?:string
    // className={`${className} ""`}
}

const KommuneSearchBox =  ( {kommuner}:FylkeSearchBoxI ) => {
  const [selectedKommune, setSelectedKommune] = useState(kommuner[0])
  const [query, setQuery] = useState('')

  const filteredKommuner =
    query === ''
      ? kommuner
      : kommuner.filter((kommune) => {
          return kommune.kommuneNavn.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedKommune} onChange={setSelectedKommune} >
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {filteredKommuner.map((kommune) => (
          <Combobox.Option key={kommune.kommuneNavn} value={kommune}>
            {kommune.kommuneNavn}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}

export default KommuneSearchBox