import { useContext, useEffect, useState } from "react"
import { AppContext } from "./_app"
import { Tag } from "@/types/tag";
import { Kommune } from "@/types/kommune";
import AppUser from "@/types/AppUser";
import { getSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import KommuneSearchBox from "@/components/sagn1/sagnForm/KommuneSearchBox";
import TagsDropBox from "@/components/sagn1/sagnForm/tagsDropBox";
import SelectedTagsBox from "@/components/sagn1/sagnForm/selectedTagsBox";
import ImageInput from "@/components/sagn1/sagnForm/imageInput";
import Input from "@/components/sagn1/sagnForm/input";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ToastType, getToastOptions } from "@/controllers/toastController";
import { toast } from "react-toastify";
import { Document, WithId } from 'mongodb'
import clientPromise from "@/lib/mongodb";
import { filterBadWords } from "@/controllers/automod";
import YearInput from "@/components/sagn1/sagnForm/yearInput";
import { Session } from "next-auth";

interface Inputs {
    title: string;
    story: string;
    tags : Tag[];
    year?: number;
    kommune: Kommune;
    stedsnavn?: string;
    owner:AppUser;
}

interface IProps{
    kommuneList: Kommune[]
    session: Session
}
  
const CreateSagn = ({kommuneList, session}: IProps) =>{
    const {title, setTitle} = useContext(AppContext);
    const [tags, setTags] = useState<Tag[]>([])
    const [images, setImages] = useState<File | null>(null)
    const [storyText, setStoryText] = useState<string>("")
    const [year, setYear] = useState<string>("")
    const [selectedKommune, setSelectedKommune] = useState<Kommune>({kommunenavn:"", kommunenavnNorsk:""} as Kommune)
    // const [stedsnavn, setStedsnavn] = useState<string>("")
    const router = useRouter()

    useEffect(() => {
      setTitle("Lag nytt sagn");
    }, [setTitle])

    const addTag= (value: Tag) => {
        setTags([...tags, value])
    }  

    const removeTag = (value: string) => {
        const equalString = (element: string) => element.localeCompare(value)
        var list = tags.filter(equalString)
        setTags(list)
    }

    //Sjekker om nødvendige input felt er gyldige -> sender en post request til server.
    const onSubmit: SubmitHandler<Inputs> = (data) =>{
        // Sjekk og varsel mot ekstremt kort tittel
        if(data.title.trim() == "" || data.title.trim().length < 3){
            toast.error("Ops! Ser ut som du ikke har skrevet ferdig tittelen", getToastOptions(ToastType.colored, "fill title"));
            return 
        }
        // Sjekk og varsel mot ekstremt kort tittel
        if(storyText.trim().length < 20 || storyText.trim() == ""){
            toast.error("Ops! Sagnet er for kort, sikker på at du har skrive fgerdig?", getToastOptions(ToastType.colored, "fill text body"));
            return 
        }

        // Sjekk og varsel mot mangel på valgt kommune
        if (selectedKommune.kommunenavnNorsk == "" || selectedKommune == undefined){
            toast.error("Ops! Ser ut som du ikke har spesifisert kommune", getToastOptions(ToastType.colored, "choose kommune"));
            return
        }
            
        data.tags = tags
        data.kommune = selectedKommune
        // data.year = year.length < 1 ? undefined : Number(year)
        // data.stedsnavn = stedsnavn.length < 1 ? undefined : stedsnavn
        data.owner = session.user!  
        data.story = storyText
        postSagn(data, router)
        };

        useForm()

        const onError: SubmitErrorHandler<Inputs> = () => {
        toast.error("Vennligs fyll ut alle felt med stjerne", getToastOptions(ToastType.colored, "fields missing"));
    }

    const {
      register,
      handleSubmit,    
    } = useForm<Inputs>();
    
    
    return (
      <div className="w-full mt-5 max-w-2xl p-2 m-auto border-solid rounded">
        <h1 className="text-center font-semibold text-xl">Nytt Sagn</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 w-full">
          <div className="flex flex-col space-x-0 sm:space-x-6 space sm:flex-row">
            <div className="flex flex-col space-y-4 w-full relative">

              <Input
                {...register("title") }
                className="mt-6 w-full my-auto"
                labelText="Tittel"
                isRequired
              />

              <div className="relative">
                <label className="absolute pointer-events-none -top-1 -left-1 transition-all scale-100 px-1 ">
                  Sagn <span className="text-red-500"> *</span>
                </label>
                <textarea className={"w-full col-end-auto outline-none p-2 mt-5 rounded-t peer" } rows={10} placeholder="Skriv historie her..."
                    value={storyText} {...register("story")} onChange={(e)=>setStoryText(e.target.value)}>
                </textarea>
                <div className="absolute top-full transition-all duration-300 bg-primary-400 w-0 h-0.5 peer-focus:w-full pointer"></div>
              </div>

              <div className="flex flex-col space-y-6 sm:justify-between self-center sm:flex-row sm:self-start sm:w-full pt-3">
                {/* <div className="flex flex-col mb-2 sm:mb-0">
                  <label>{"Årstall/ Århundre"}</label>
                  <input type="number" min={0} max={new Date().getFullYear()} value={year} onChange={(e) => setYear(e.target.value)} className="w-52 p-1 rounded"></input>
                </div> */}
                <YearInput
                  {...register("year") }
                  className="w-52 mt-auto"
                  labelText="Årstall"
                />
                
                <KommuneSearchBox kommuner={kommuneList} selectedKommune={selectedKommune} handleChange={(e: Kommune)=>setSelectedKommune(e)} className="items-center relative" />
              </div>
              
              <div className="flex flex-col-reverse sm:justify-between self-center items-center sm:flex-row sm:self-start sm:w-full">
                <TagsDropBox key={tags.length} className="mt-3 sm:mt-auto" list={tags} handleTag={addTag} propText={"Velg Tagger"} propTextEmpty={"Ikke fler Tagger"}/>
                              
                {/* <div className="flex flex-col">
                  <label>Stedsnavn</label>
                  <input type="string" className="w-52 p-1 rounded" value={stedsnavn} onChange={(e) => setStedsnavn(e.target.value)}></input>
                </div> */}
                <Input
                {...register("stedsnavn") }
                className="w-52 mt-3"
                labelText="Stedsnavn"
              />

              </div>
              <SelectedTagsBox key={tags.length} removeTag={removeTag} tagList={tags}/>

              <ImageInput onImageChange={setImages} onConvertToText={ (text:string) => {setStoryText(storyText.length>0? storyText+ " " +text : text)} } images={images} className="mt-6"/>
            </div>
            <button className="mt-4 p-2 place-self-center sm:place-self-end sm:mb-auto sm:mt-2 sm:px-4 transition duration-300 text-white font-semibold  active:scale-95  bg-secondary-400 
                    hover:bg-secondary-600 shadow shadow-emphasis-600/25 rounded-md hover:shadow-secondary-500"
                    type="submit"
            >
              Publiser
            </button>
          </div>
        </form>
      </div>
    )
}

async function postSagn (data:Inputs, router: NextRouter){
    const options:RequestInit={
      headers:{
        'Content-Type':'application/json',
      },
      method:'POST',
      body:JSON.stringify({
        "title": filterBadWords(data.title),
        "text": filterBadWords(data.story) ,
        "tags":data.tags,
        "happenedAt": data.year != undefined ? (data.year < 1 ? undefined : Number(data.year)) : undefined,
        "kommune": data.kommune,
        "stedsnavn": data.stedsnavn,
        "owner":data.owner,
        "likes": Array(0),
        "dislikes":Array(0),
        "comments":Array(0),
        "postedAt": new Date().setUTCHours(new Date().getUTCHours() + 1 )
      }),
    }
    
    console.log(data.kommune)
    await fetch("api/post/Post", options).catch()
    .then((res)=>{
      if(res.status == 200){
        toast.success("Sagn publisert", getToastOptions(ToastType.light, "succsessful post"))
        router.push("/#")
      }
      else {
        toast.error("Det skjedde en feil under publisering av sagn", getToastOptions(ToastType.colored, "failed_post"))
        console.log(res.status)
      }
    })
  }

  // Henter en lsite med kommuner fra databasen
  export async function getServerSideProps(context:any) {
    const session = await getSession(context)
    if( !session ){
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    
    const client = await clientPromise;
    const db = client.db("App_Db");
    try {
        const fylkeList:WithId<Document>[] = await db
        .collection("fylker")
        .find().toArray()
        
        const kommuneSet = new Array()
        fylkeList.forEach( (doc) => {
          if(doc.kommuner != null){
              doc.kommuner.forEach( (kommune:Kommune) => {
              kommuneSet.push(kommune)
          })}
        })
  
        return {
          props: {
            kommuneList: JSON.parse(JSON.stringify(kommuneSet)),
            session: JSON.parse(JSON.stringify(session))
          }
        }
    } catch (e) {
        console.error(e);
    }
}

export default CreateSagn