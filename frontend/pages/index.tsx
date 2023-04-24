import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SagnListController, { SortTypes } from '@/components/controller/sagnListController'
import { useState, useEffect, useContext } from 'react'
import Sagn, { SagnJSON } from "@/objects/sagn"
import { AppContext } from "@/pages/_app"
import SagnCard from '@/components/sagn1/sagnCard/sagnCard'
import clientPromise from '@/lib/mongodb'
import { Document, ObjectId, WithId } from 'mongodb'
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
  const [list, setList] = useState<Sagn[]>(Array())
  const [isLoading, setLoading] = useState(false)
  const {title, setTitle} = useContext(AppContext);  
  const [query, setQuery] = useState<(string)>("")

  useEffect(() => {
    setList(sagnListController.sortSagn(sagnListController.sortType.type))
      
    setTitle("Velkommen til Bygdesagn ™")
  }, [sagnListController, setTitle])

  const resetSearch = () => {
    setList(sagnListController.sagnList)
    setQuery("")
  }

  const filterSagn = async (value:(Fylke|Kommune|Stedsnavn)) => {
    if(value.fylkenavn != null){
      const response = await fetch(`api/post/getPostByFylkenavn?fylkenavn=${value.fylkenavn}`)
      if(response.ok){
        const data = await response.json()
        if(data !== undefined && data !== null && data.length > 0)
            setList(data)
      }
      else{
        setList([])
      }

    }
    else if(value.kommunenavnNorsk != null){
      console.log("kommune")
      await fetch(`api/post/Post?kommune.kommunenummer=${value.kommunenummer}`)
      .then(data=>{
        console.log(data)
        // filteredList = Array<Sagn>(data)
      })
      console.log("kommune instance")
    }
    else if (value.stedsnavn != null ){
      await fetch(`api/post/Post?kommune.kommunenummer=${value.stedsnavn}`)
      console.log("stedsnavn instance")
    }

    // let filter = (element: Sagn) => element.kommune.kommunenavnNorsk.localeCompare()
    let test = sagnListController.sagnList.filter((sagn:Sagn) => sagn )
  }

  return (
      <div className="w-full flex flex-col items-center text-textColor">
          <div className="pt-10 space-y-2 relative " >
              <div className='flex  outline-2 bg-primary-100 focus-within:outline outline-blue-500 shadow-lg rounded w-80'>
                  <span className="p-2 rounded rounded-r-none border-r-0"> 
                      <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                  <FylkeSortListBox 
                    className="grow my-auto rounded-l-none bg-primary-100 focus:outline-none border-l-0 rounded placeholder-textColor" 
                    // filterSagn = {filterSagn}
                    fylkeList={fylkeList}
                    kommuneList={kommuneList}
                    stedsnavnList={stedsnavnList}
                    handleChange={filterSagn}
                    query={query}
                    setQuery={setQuery}
                  />
                  <button className='p-1 my-auto mx-2 rounded bg-secondary-200' onClick={resetSearch}>Nullstill</button>
                  {/* <input className="grow rounded-l-none bg-primary-100 focus:outline-none border-l-0 rounded placeholder-textColor " placeholder='Søk på sted...'/> */}
              </div>
          </div>

          <div className="mt-5 mx-auto content-center w-full sm:w-auto ">
              <div className="flex flex-col sm:min-w-[600px] md:min-w-[668px] md:max-w-screen-lg justify-center">
                  <h2 className="text-lg font-bold text-center">
                      Nyeste Innlegg
                  </h2>
                  <SagnSortListBox className= "place-self-end" sagnListController={sagnListController} updateList={(e:SortTypes) => setList(sagnListController.sortSagn(e))}/>
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

export async function getServerSideProps() {
  interface FylkeI extends WithId<Document>{
    document: WithId<Document>
    &{
      fylke:Fylke
    }
  }
  try {
      const client = await clientPromise;
      const db = client.db("App_Db");

      const sagnList = await db
      .collection(process.env.POST_COLLECTION!)
      .find().toArray()

      const fylkeListFull:WithId<Document>[] = await db
      .collection("fylker")
      .find().toArray()

      // const fylkeListFiltered = fylkeListFull.map((doc:WithId<Document>) => {
      //   return {fylkeNavn: doc.fylkkenavn, kommuner:
      //     doc.kommuner != null?
      //     doc.value.kommuner.map((kommune:Kommune)=> {
      //         return { kommunenavnNorsk: kommune.kommunenavnNorsk, stedsnavn: kommune.stedsnavn }
      //     })
      //     :Array<string>()
      //   }
      // })

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