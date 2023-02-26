import React, { useRef } from "react";


interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  className?: string;
  error?: string;
}
// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, IProps> (
  ({ labelText, className, error, ...props }, ref) => {
  const focusRef = useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);
  const handleClick = () => {
    if(focusRef.current)
    focusRef.current.focus();
  };
    return (
      <>
         
        <div
          className={`${className} ${
            error && "animate-shake"
          } relative border-b-2 inline-flex justify-center`}
        >
          <input
            ref={focusRef}
            {...props}
            className="w-full pl-1 rounded-t focus:ring-0 border-transparent focus:border-transparent peer"
            type={"text"}
            placeholder=" "
          />
          <div className="border-sky-500 absolute top-full transition-all duration-300 bg-sky-500 w-0 h-0.5 peer-focus:w-full pointer"></div>
          <label onClick={handleClick} className="absolute -top-[1.2rem] transition-all scale-75 px-1 duration hover:cursor-text peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0
                            peer-placeholder-shown:left-2 peer-placeholder-shown:text-slate-500 peer-focus:-top-[1.2rem] peer-focus:scale-75 peer-focus:-left-2 peer-focus:text-sky-800"
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