import React, { FormEvent, useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import TagsDropBox from "../tagsDropBox";
import Input from "./input";
import TextArea from "./textArea";
import SelectedTagsBox from "./selectedTagsBox";
import { Tag } from "@/types/tag";
import { NextRouter, useRouter } from "next/router";
import ImageInput from "./imageInput";
import {useSession, signIn, signOut,getSession} from 'next-auth/react'
import { Session } from "next-auth";
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Inputs {
  title: string;
  story: string;
  tags : Tag[];
  owner:Session;
}

interface Props {
  className?: string;
}

const errorToastOptions: ToastOptions<{}> = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "colored",
  }

const NewSagnForm = ({className}: Props) => {
  const [tags, setTags] = useState<Tag[]>([])
  const [images, setImages] = useState<File | null>(null)
  const [storyText, setStoryText] = useState<string>("")
  const router = useRouter()

  const addTag= (value: Tag) => {
    setTags([...tags, value])
  }  

  const removeTag = (value: string) => {
    const equalString = (element: string) => element.localeCompare(value)
    var list = tags.filter(equalString)
    setTags(list)
  }
  const{data:session}=useSession();
  const onSubmit: SubmitHandler<Inputs> = (data) =>{
    console.log(data.story)
    // Sjekk og varsel om blanke felt
    if(data.title.trim() == "" || data.story.trim() == ""){
      toast.error("Vennligst fyll ut alle felt", errorToastOptions);
      return 
    }
    // Sjekk og varsel mot ekstermt kort tekst
    if(data.title.trim().length < 4 || data.story.trim().length < 20 ){
      toast.error("Ops! Ser ut som du ikke har skrevet ferdig", errorToastOptions);
      return 
    }
    else{    
      data.tags = tags
      postSagn(data, router)
    }
  };

  useForm()

  const onError: SubmitErrorHandler<Inputs> = () => {
    toast.error("Vennligs fyll ut alle felt", errorToastOptions);
  }

  const {
    register,
    handleSubmit,    
  } = useForm<Inputs>();

  return (
    <div className={`${className} ${"space-y-6"}`}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        <Input
          {...register("title") }
          className="mt-6 w-full"
          labelText="Tittel"
        />

        <div className="relative">
        <label className="absolute pointer-events-none -top-1 -left-3 transition-all scale-75 px-1 ">
          Historie
        </label>
          <textarea className={"w-full col-end-auto outline-none p-2 mt-5" } rows={10} placeholder="Skriv historie her..."
              value={storyText} {...register("story")} onChange={(e)=>setStoryText(e.target.value)}>
          </textarea>
        </div>

        <div className="flex flex-row space-x-2 place-content-between">
          <TagsDropBox key={tags.length} className="mt-2" list={tags} handleTag={addTag} propText={"Velg Tagger"} propTextEmpty={"Ikke fler Tagger"}/>
          <button className="mt-2 transition duration-500 text-white font-semibold  active:scale-95 py-2 px-4 bg-secondary-500 
                           hover:bg-green-500 shadow shadow-emphasis-600/25 rounded-md hover:shadow-secondary-500"
                  type="submit"
          >
              Publiser
          </button>
        </div>
        
        <SelectedTagsBox key={tags.length} removeTag={removeTag} tagList={tags} />

      </form>
      
      <ImageInput onImageChange={setImages} onConvertToText={(text:string) => {setStoryText(storyText+"\n"+text)}} images={images} className="mt-6"></ImageInput>
    </div>
  );
};



const postSagn = async (data:Inputs, router: NextRouter ) =>{
  const JSOndata = {
    "post_id":0,
    "title":data.title,
    "text":data.story,
    "tags":data.tags,
    // "owner":data.owner.user?.name,
    "likes": [],
    "dislikes":[],
    "postedAt": new Date().setUTCHours(new Date().getUTCHours() + 1 )
  }

  const options:RequestInit={
    headers:{
      'Content-Type':'application/json',
    },
    method:'POST',
    body:JSON.stringify(JSOndata),
  }
  console.log(JSOndata)
  const endpoint=("http://bop3000-app.vercel.app/post/postPost")
  const response = await fetch(endpoint,options).catch()
  const result = response.json;
  
  toast.success("Sagn publisert", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
    toastId: "succsessful post"
  },)

  router.push("/#")
}

export default NewSagnForm;
