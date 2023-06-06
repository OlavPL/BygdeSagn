import React from "react"
import { displayName } from "react-gravatar";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  className?: string;
  error?: string;
}
const YearInput = React.forwardRef<HTMLInputElement, IProps> (({labelText, className, error, ...props }, ref) => {
  YearInput.displayName="YearInput"
  return (
    <div
      className={`
        ${className} 
        relative border-b-2 inline-flex 
        `}
    >
      <input
        ref={ref}
        {...props}
        type="number" min={0} max={new Date().getFullYear()}
        className="w-full rounded-t pl-2 focus:ring-0 outline-none border-transparent focus:border-transparent peer"
        placeholder=""
      />
      <div className="absolute top-full transition-all duration-300 bg-primary-400 w-0 h-0.5 peer-focus:w-full pointer"></div>

      {/* styling for en mer dynamisk label */}
      {/* peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 peer-placeholder-shown:-left-0 peer-placeholder-shown:text-slate-500 
      peer-focus:-top-6 peer-focus:scale-75 peer-focus:-left-2 peer-focus:text-sky-800" */}
      <label className="absolute pointer-events-none -top-6 -left-1 transition-all scale-100 px-1 duration ">
        {labelText}
      </label>
    </div>
  )
});

export default YearInput;
