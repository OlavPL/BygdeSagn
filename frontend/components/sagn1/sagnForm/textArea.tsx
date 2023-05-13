import React, { FormEvent, useRef } from "react";


// Kode for å legge komponent til i newSagnForm om dette blir fikset videre på 
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

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
  className?: string;
  error?: string;
  storyText: string;
  onInput2: React.Dispatch<React.SetStateAction<string>>;
}
// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLTextAreaElement, IProps> (
  ({ labelText, className, error, storyText, onInput2, ...props }, ref) => {
    return (
      <>
        <div
          className={`
            ${className} 
            ${error && "outline outline-2 outline-offset-1 outline-red-600 rounded-sm"}
            relative border-b-2 inline-flex justify-center
          `}
        >
          <textarea rows={6} cols={60}
            required
            value={storyText}
            onChange={(e)=>{console.log(e.target.value)}}
            ref={ref}
            {...props}
            className="w-full pl-1 rounded-t focus:ring-0 outline-none border-transparent focus:border-transparent peer"
          
            placeholder=" "
          />
          <div className="border-sky-500 absolute top-full transition-all duration-300 bg-sky-500 w-0 h-0.5 peer-focus:w-full pointer"></div>
          <label className="absolute pointer-events-none -top-6 transition-all scale-75 px-1 duration 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 peer-placeholder-shown:left-2 peer-placeholder-shown:text-slate-500
            peer-focus:-top-[1.3rem] peer-focus:scale-75 peer-focus:-left-2 peer-focus:text-sky-800"
          >
            {labelText}
          </label>
        </div>
        {error && (
          <p className={`${error && "animate-shake"} text-red-500 mt-1`}>
            {error}
          </p>
        )}
      </>
    );
  }
);

export default Input;