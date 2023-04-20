import React, { FormEvent, useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import TagsDropBox from "./tagsDropBox";
import Input from "./input";
import TextArea from "./textArea";
import SelectedTagsBox from "./selectedTagsBox";
import { Tag } from "@/types/tag";
import { NextRouter, useRouter } from "next/router";
import ImageInput from "./imageInput";
import {useSession, signIn, signOut,getSession} from 'next-auth/react'
import { Session } from "next-auth";
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KommuneSearchBox from "./KommuneSearchBox";
import { Kommune } from "@/types/typKommune";
import AppUser from "@/types/AppUser";
import { ToastType, getToastOptions } from "@/components/controller/toastController";


interface Inputs {
  title: string;
  story: string;
  tags : Tag[];
  year?: number;
  kommune: Kommune;
  stedsnavn?: string;
  owner:AppUser;
}

interface Props {
  className?: string;
}

// const errorToastOptions: ToastOptions<{}> = {
//   position: "top-center",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: false,
//   progress: undefined,
//   theme: "colored",
// }

const NewSagnForm = ({className}: Props) => {
  const session = useSession({required:true}); 
  const [tags, setTags] = useState<Tag[]>([])
  const [images, setImages] = useState<File | null>(null)
  const [storyText, setStoryText] = useState<string>("")
  const [year, setYear] = useState<string|undefined>()
  const [kommuneListe, setKommuneListe] = useState<Kommune[]>([])
  const [selectedKommune, setSelectedKommune] = useState<Kommune>({kommunenavn:"", kommunenavnNorsk:""} as Kommune)
  const [stedsnavn, setStedsnavn] = useState<string|undefined>()
  const router = useRouter()
  

  const addTag= (value: Tag) => {
    setTags([...tags, value])
  }  

  const removeTag = (value: string) => {
    const equalString = (element: string) => element.localeCompare(value)
    var list = tags.filter(equalString)
    setTags(list)
  }
  const onSubmit: SubmitHandler<Inputs> = (data) =>{
    // Sjekk og varsel om blanke felt
    if(data.title.trim() == "" || storyText.trim() == ""){
      toast.error("Vennligst fyll ut alle felt", getToastOptions(ToastType.colored, "fill fields"));
      return 
    }
    // Sjekk og varsel mot ekstermt kort tekst
    if(data.title.trim().length < 3){
      toast.error("Ops! Ser ut som du ikke har skrevet ferdig tittelen", getToastOptions(ToastType.colored, "fill title"));
      return 
    }

    if(storyText.trim().length < 20 ){
      toast.error("Ops! Ser ut som du ikke har skrevet ferdig sagnet", getToastOptions(ToastType.colored, "fill text body"));
      return 
    }

    if (selectedKommune.kommunenavnNorsk == "" || selectedKommune == undefined){
      toast.error("Ops! Ser ut som du ikke har spesifisert kommune", getToastOptions(ToastType.colored, "choose kommune"));
      return
    }
      
    data.tags = tags
    data.kommune = selectedKommune
    data.year = year == undefined ? undefined : Number(year)
    data.stedsnavn = stedsnavn
    data.owner = session.data?.user!  
    data.story=storyText
    postSagn(data, router)
  };

  useForm()

  const onError: SubmitErrorHandler<Inputs> = () => {
    toast.error("Vennligs fyll ut alle felt", getToastOptions(ToastType.colored));
  }

  const {
    register,
    handleSubmit,    
  } = useForm<Inputs>();

  useEffect(() => {
    const getKommuner = async () =>{
      await fetch('/api/post/data/getKommuner')
      .then((res) => res.json())
      .then((data) => {
          setKommuneListe(data)
      })
    }
    getKommuner()
    
  }
  , [setKommuneListe])

  return (
      <form onSubmit={handleSubmit(onSubmit, onError)} className={`${className} ${"space-y-4 w-full"} `}>
        <div className="flex flex-col space-x-0 sm:space-x-6 space sm:flex-row">
          <div className="flex flex-col space-y-4 w-full relative">

            <Input
              {...register("title") }
              className="mt-6 w-full my-auto"
              labelText="Tittel"
            />

            <div className="relative">
              <label className="absolute pointer-events-none -top-1 -left-1 transition-all scale-100 px-1 ">
                Historie <span className="text-red-500"> *</span>
              </label>
              <textarea className={"w-full col-end-auto outline-none p-2 mt-5 rounded-t" } rows={10} placeholder="Skriv historie her..."
                  value={storyText} {...register("story")} onChange={(e)=>setStoryText(e.target.value)}>
              </textarea>
            </div>

            <div className="flex flex-col justify-between self-center sm:flex-row sm:self-start sm:w-full">
              <div className="flex flex-col mb-2 sm:mb-0">
                <label>{"Årstall/ Århundre"}</label>
                <input type="number" min={0} max={new Date().getFullYear()} value={year} onChange={(e) => setYear(e.target.value)} className="w-52 p-1 rounded"></input>
              </div>
              
              <KommuneSearchBox kommuner={kommuneListe} selectedKommune={selectedKommune} handleChange={(e: Kommune)=>setSelectedKommune(e)} className="items-center relative" />
            </div>
            
            <div className="flex flex-col-reverse justify-between self-center sm:flex-row sm:self-start sm:w-full  ">
              <TagsDropBox key={tags.length} className="mt-5 sm:mt-auto " list={tags} handleTag={addTag} propText={"Velg Tagger"} propTextEmpty={"Ikke fler Tagger"}/>
                           
              <div className="flex flex-col">
                <label>Stedsnavn</label>
                <input type="string" className="w-52 p-1 rounded" value={stedsnavn} onChange={(e) => setStedsnavn(e.target.value)}></input>
              </div>

            </div>
            <SelectedTagsBox key={tags.length} removeTag={removeTag} tagList={tags} />

            <ImageInput onImageChange={setImages} onConvertToText={ (text:string) => {setStoryText(storyText.length>0? storyText+ " " +text : text)} } images={images} className="mt-6"></ImageInput>
          </div>
          <button className="mt-4 p-2 place-self-center sm:place-self-end sm:mb-auto sm:mt-2 sm:px-4 transition duration-500 text-white font-semibold  active:scale-95  bg-secondary-500 
                  hover:bg-green-500 shadow shadow-emphasis-600/25 rounded-md hover:shadow-secondary-500"
                  type="submit"
          >
            Publiser
          </button>
        </div>
      </form>
  );
};

const postSagn = async (data:Inputs, router: NextRouter ) =>{
  const options:RequestInit={
    headers:{
      'Content-Type':'application/json',
    },
    method:'POST',
    body:JSON.stringify({
      "title":data.title,
      "text":data.story,
      "tags":data.tags,
      "happenedAt":data.year,
      "kommune": data.kommune,
      "stedsnavn": data.stedsnavn,
      "owner":data.owner,
      "likes": Array(0),
      "dislikes":Array(0),
      "postedAt": new Date().setUTCHours(new Date().getUTCHours() + 1 )
    }),
  }
  
  const response = await fetch("api/post/Post",options).catch()
  .finally(()=>{
    toast.success("Sagn publisert", getToastOptions(ToastType.light, "succsessful post"))
    router.push("/#")
  })
  

}

export default NewSagnForm;
