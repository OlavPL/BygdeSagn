import { it } from "node:test";
import { ReactNode } from "react";

interface ITooltip{
    message: string
    children: ReactNode 
    containerClassName?: string
    ClassName?: string
}
const Tooltip = ({ message, children, containerClassName, ClassName }: ITooltip) => {
  return (
    <div className={`relative flex flex-col items-center group ${containerClassName}`} >
      {children}
      <div className={`absolute bottom-0 hidden group-hover:flex flex-col items-center mb-6 ${ClassName}`}>
        <span className="relative z-10 p-2 text-sm leading-none whitespace-no-wrap bg-emphasis-300 shadow-lg rounded-md">{message}</span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-emphasis-300"></div>
      </div>
    </div>
  );
};

export default Tooltip