import Kommune from "@/types/Kommune";

const FylkeTing = () => (
  <div>
        <button onClick={setFylker}>BUTTON</button>
  </div>
);

interface FylkeI {
    fylkenavn: string;
    fylkenummer: string;
    kommuner:Kommune[];
}
interface KommuneI {
    // _id:string
    kommunenavn: string
    kommunenavnNorsk: string
    kommunenummer: string
    // stedsnavn: string
    fylkesnavn: string
    fylkesnummer: string
}


  const postSagn = async (data:any) =>{

    let fylkeArr: FylkeI[] = Array()
    data.forEach((fylke:any) => {
        let kommuner: KommuneI[] = Array()
        fylke.kommuner.forEach((e:Kommune) =>{
            let kommune = {
                fylkesnavn:  e.fylkesnavn,
                fylkesnummer: e.fylkesnummer,
                kommunenavn: e.kommunenavn,
                kommunenavnNorsk: e.kommunenavnNorsk,
                kommunenummer:e.kommunenummer
            }
            kommuner.push(kommune)
        })

        let fylkedata = {
            fylkenavn: fylke.fylkesnavn,
            fylkenummer: fylke.fylkesnummer,
            kommuner: kommuner
        }
        fylkeArr.push(fylkedata)
    });
    console.log(fylkeArr)

    // const fylkedata = {
    //     "fylkenavn": data.fylkenavn,
    //     "fylkenummer": data.fylkenummer,
    //     "kommuner": data.kommuner
    // }


    const options:RequestInit={
        headers:{
        'Content-Type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(fylkeArr),
    }
    
    // console.log(JSOndata)
    const endpoint=("api/post/data/setFylkeKommune")
    const response = fetch(endpoint,options).catch()
    
}
  
const setFylker = async () =>{

    await fetch('/api/post/data/getFylkeKommune')
    .then((res) => res.json())
    .then((data) => {
        postSagn(data)
    })

}

export default FylkeTing;