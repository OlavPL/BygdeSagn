import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TagsListBox from "./Controller/tagsListBox";
import Input from "./Input";
import TextArea from "./TextArea";
import SelectedTagsBox from "./Controller/selectedTagsBox";

interface Inputs {
  title: string;
  story: string;
}

interface Props {
  className?: string;
}

const NewSagnForm = ({className}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  
  const [tags, setTags] = useState([])
  const addTag= () => {

  }

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${className}`}>
      <Input
        {...register("title")}
        className="mt-4"
        labelText="Tittel"
      />
      <TextArea
        {...register("story", { required: true })}
        className="mt-4"
        labelText="Historie"
        error={errors.story && "Historien må skrives"}
      />
      <div className="flex flex-row space-x-2 place-content-between">
        <button
            className="mt-2 transition duration-500 active:scale-95 py-2 px-4 bg-violet-500 hover:bg-violet-700
                 hover:bg-gra text-white shadow shadow-violet-600/25 rounded-md hover:shadow-violet-600/75"
            type="submit"
        >
            submit
        </button>
        <TagsListBox className="mt-2" list={tags} onChange={addTag}/>
      </div>
      {/* <SelectedTagsBox className=""/> */}
    </form>
  );
};

export default NewSagnForm;