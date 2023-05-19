import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SagnListController, { SortType } from '@/controllers/sagnListController'
import { useState, useEffect, useContext } from 'react'
import Sagn, { SagnJSON } from "@/objects/sagn"
import { AppContext } from "@/pages/_app"
import SagnCard from '@/components/sagn1/sagnCard/sagnCard'
import clientPromise from '@/lib/mongodb'
import { Document, WithId } from 'mongodb'
import { Kommune } from '@/types/kommune'
import FylkeSortListBox from '@/components/fylkeSearchListBox'
import SagnSortListBox from '@/components/sagnSortListBox'
import { Fylke } from '@/types/fylke'
import { Stedsnavn } from '@/types/stedsnavn'

library.add(fas)

interface ServersideProps {
  sagnList: SagnJSON[]
  fylkeList: Fylke[]
  kommuneList:Kommune[]
  stedsnavnList:Stedsnavn[]
}

const Home = ({sagnList, fylkeList, kommuneList, stedsnavnList}:ServersideProps) => {
  const [sagnListController, setListController] = useState(new SagnListController(sagnList))

  // list: Nåverende og stadig oppdatert liste av sagn som skal vises
  const [currentSagnList, setCurrentSagnList] = useState<Sagn[]>()
  const [searchQuery, setSearchQuery] = useState<(string)>("")

  const {title, setTitle} = useContext(AppContext);  

  useEffect(() => {
    if(currentSagnList === undefined)
      setCurrentSagnList(sagnListController.sortSagn(sagnList, sagnListController.sortType))
      
    setTitle("Velkommen til Bygdesagn ™")
  }, [currentSagnList, sagnList, sagnListController, setTitle])

  const resetSearch = () => {
    setCurrentSagnList(sagnListController.sagnList)
    setSearchQuery("")
  }


    // Sjekker om objektet har spesifikke verdier for å sjekke type og sortere, 
    // siden metoden kan motta tre forskjellige objekttyper (Fylke, Kommune og Stedsnavn)
  const filterSagn = async (value:any ) => {
    
    let filteredSagn = Array<Sagn>()

    if(value.fylkenavn != null){
      fylkeList.forEach((fylke: Fylke) =>{
        if(fylke.fylkenavn === value.fylkenavn){
          fylke.kommuner.forEach((kommune:Kommune) => {
            sagnListController.sagnList.forEach(post => {
              if( kommune.kommunenummer === post.kommune.kommunenummer ){
                filteredSagn.push(post)
              }
            })
          })
        }
      })

    }
    else if (value.kommunenummer != null) {
      sagnListController.sagnList.forEach( post => {
        if( post.kommune.kommunenummer === value.kommunenummer ) {
        }
      })
    }
    else if (value.stedsnavn != null ){
      sagnListController.sagnList.forEach( post => {
        if( post.stedsnavn === value.stedsnavn ) {
          filteredSagn.push( post )
        }
      })
    }
    
    setCurrentSagnList(sagnListController.sortSagn(filteredSagn, sagnListController.sortType))
  }

  return (
      <div className="w-full flex flex-col items-center text-textColor">
          <div className="flex flex-row pt-10 relative " >
              <div className='flex outline-2 bg-primary-100 focus-within:outline outline-blue-500 shadow-lg rounded w-80'>
                  <span className="p-2 rounded rounded-r-none border-r-0"> 
                      <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                  <FylkeSortListBox 
                    className="grow my-auto rounded-l-none focus:outline-none border-l-0 rounded placeholder-textColor " 
                    placeholder='Søk på sted...'
                    fylkeList={fylkeList}
                    kommuneList={kommuneList}
                    stedsnavnList={stedsnavnList}
                    handleChange={filterSagn}
                    query={searchQuery}
                    setQuery={setSearchQuery}
                  />
              <button className='p-1 mx-2 my-auto rounded bg-primary-300 hover:bg-primary-500 drop-shadow-m' onClick={resetSearch}>Nullstill</button>
              </div>
          </div>

          <div className="mt-5 mx-auto content-center w-full sm:w-auto ">
              <div className="flex flex-col sm:min-w-[600px] md:min-w-[668px] md:max-w-screen-lg justify-center">
                  <h2 className="text-lg font-bold text-center">
                      Nyeste Innlegg
                  </h2>
                  <SagnSortListBox 
                    className= "place-self-end mr-2" 
                    sagnListController={sagnListController} 
                    updateList={(e:SortType) => {
                      sagnListController.sortType = e
                      setCurrentSagnList(sagnListController.sortSagn(currentSagnList === undefined? sagnList : currentSagnList , e))
                    }}
                  />
                  <div className={`flex flex-col w-full mt-3 p-2 gap-3 sm:gap-x-5 items-center `}>
                      {currentSagnList?.map((sagn: Sagn, index) => (
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

// henter fylker, kommuner, stedsnavn og sagn via server.
export async function getServerSideProps() {
  try {
      const client = await clientPromise;
      const db = client.db("App_Db");

      const sagnList = await db
      .collection(process.env.POST_COLLECTION!)
      .find().toArray()

      const fylkeListFull:WithId<Document>[] = await db
      .collection("fylker")
      .find().toArray()

      const fylkeSet = new Array()
      const kommuneSet = new Array()
      const stedsNavnSet = new Array()

      fylkeListFull.forEach( (doc) => {

        fylkeSet.push({fylkenavn: doc.fylkenavn, kommuner: doc.kommuner})

          if(doc.kommuner != null){
            doc.kommuner.forEach( (kommune:Kommune) => {
            kommuneSet.push(kommune)
          
          if(kommune.stedsnavnList != null )
            kommune.stedsnavnList.forEach( (stedsnavn: Stedsnavn) => {
              stedsNavnSet.push(stedsnavn)
            })
            
        })}
      })

      return {
          props: {
            sagnList: JSON.parse(JSON.stringify(sagnList)),
            fylkeList: JSON.parse(JSON.stringify(fylkeSet)),
            kommuneList: JSON.parse(JSON.stringify(kommuneSet)),
            stedsnavnList: JSON.parse(JSON.stringify(stedsNavnSet)),
          }
      }
  } catch (e) {
      console.error(e);
  }

}

export default Home;