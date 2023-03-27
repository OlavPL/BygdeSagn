import React, { FormEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TagsDropBox from "../tagsDropBox";
import Input from "./input";
import TextArea from "./textArea";
import SelectedTagsBox from "./selectedTagsBox";
import { Tag } from "@/types/tag";
import { NextRouter, useRouter } from "next/router";
import ImageInput from "./imageInput";


interface Inputs {
  title: string;
  story: string;
  tags : Tag[];
}

interface Props {
  className?: string;
}



const NewSagnForm = ({className}: Props) => {
  const [tags, setTags] = useState<Tag[]>([])
  const [images, setImages] = useState<FileList | null>(null)
  const [storyText, setStoryText] = useState<string>("")
  const router = useRouter()

  const onImageChange = (files: FileList | null) =>{
    if( files!= null){
      setImages(files)
    }
  }

  const addTag= (value: Tag) => {
    setTags([...tags, value])
  }  

  const removeTag = (value: string) => {
    const equalString = (element: string) => element.localeCompare(value)
    var list = tags.filter(equalString)
    setTags(list)
  }

  const onSubmit: SubmitHandler<Inputs> = (data) =>{
    data.tags = tags
    postSagn(data, router)
  };
  useForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div className={`${className} ${"space-y-6"}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          {...register("title", {required:true}) }
          className="mt-6 w-full"
          labelText="Tittel"
          error={errors.title && "Angi tittel"}
        />
        {/* <TextArea 
          {...register("story", { required: true })}
          className=""
          value={storyText}
          onInput2={setStoryText}
          labelText="Historie"
          storyText={storyText}
          // onInput={(e:FormEvent<HTMLTextAreaElement>)=>{setStoryText(e.currentTarget.value), console.log(e.currentTarget.value)}}
          error={errors.story && "Historien må skrives"}
        /> */}
        <div className="relative">
        <label className="absolute pointer-events-none -top-1 -left-2 transition-all scale-90 px-1 "
          >
          Historie
        </label>
          <textarea className="w-full col-end-auto outline-none p-2 mt-5" rows={10} placeholder="Skriv historie her..."
              value={storyText} {...register("story",{required:true})} onChange={(e)=>setStoryText(e.target.value)}></textarea>
        </div>
        <div className="flex flex-row space-x-2 place-content-between">
          <TagsDropBox key={tags.length} className="mt-2" list={tags} handleTag={addTag} propText={"Velg Tagger"} propTextEmpty={"Ikke fler Tagger"}/>
          <button
              className="mt-2 transition duration-500 text-white font-semibold  active:scale-95 py-2 px-4 bg-secondary-600 hover:bg-green-500
                  shadow shadow-emphasis-600/25 rounded-md hover:shadow-secondary-500"
              type="submit"
          >
              Publiser
          </button>
        </div>
        <SelectedTagsBox key={tags.length} removeTag={removeTag} tagList={tags} />

      </form>
      
      <ImageInput onImageChange={onImageChange} onConvertToText={(text:string) => {setStoryText(storyText+"\n"+text)}} images={images} className="mt-6"></ImageInput>
    </div>
  );
};



const postSagn = async (data:Inputs, router: NextRouter )=>{

  const JSOndata = {
    "post_id":0,
    "title":data.title,
    "text":data.story,
    "tags":data.tags,
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
  const endpoint=("http://localhost:3000/api/post/postPost")
  const response = await fetch(endpoint,options).catch()
  const result = response.json;
  router.push("/#")
  console.log(result)
}

export default NewSagnForm;
