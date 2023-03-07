import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TagsDropBox from "./tagsDropBox";
import Input from "./Input";
import TextArea from "./TextArea";
import SelectedTagsBox from "./Controller/selectedTagsBox";
import { Tag } from "@/types/tag";
import { NextRouter, useRouter } from "next/router";

const postSagn = async (data:Inputs, router: NextRouter )=>{

  const JSOndata= {
    "title":data.title,
    "text":data.story,
    "tags":data.tags,
    "likes":0,
    "dislikes":0,
    "id":0,
    "postedAt":new Date().setUTCHours(new Date().getUTCHours() + 1)
  }
  // const JSOndata = data;

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


interface Inputs {
  title: string;
  story: string;
  tags : Tag[];
}

interface Props {
  className?: string;
}

const NewSagnForm = ({className}: Props) => {
    const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [tags, setTags] = useState([Tag.SAGN])

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${className} ${"space-y-6"}`}>
      <Input
        {...register("title", {required:true}) }
        className="mt-6"
        labelText="Tittel"
        error={errors.title && "Angi tittel"}
      />
      <TextArea
        {...register("story", { required: true })}
        className=""
        labelText="Historie"
        error={errors.story && "Historien må skrives"}
      />
      <div className="flex flex-row space-x-2 place-content-between">
        <button
            className="mt-2 transition duration-500 active:scale-95 py-2 px-4 bg-violet-500 hover:bg-violet-700
                 text-white shadow shadow-violet-600/25 rounded-md hover:shadow-violet-600/75"
            type="submit"
        >
            submit
        </button>
        <TagsDropBox key={tags.length} className="mt-2" list={tags} handleTag={addTag} propText={"Velg Tagger"} propTextEmpty={"Ikke fler Tagger"}/>
      </div>
      <SelectedTagsBox key={tags.length} removeTag={removeTag}  tagList={tags} />
    </form>
  );
};

export default NewSagnForm;