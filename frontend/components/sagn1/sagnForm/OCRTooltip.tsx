import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { it } from "node:test";
import { ReactNode } from "react";

interface ITooltip{
    children: ReactNode 
    ClassName?: string
}
const OCRTooltip = ({ children, ClassName }: ITooltip) => {
  return (
    <div className={`relative flex flex-col items-center group `} >
    <FontAwesomeIcon icon={faCircleQuestion} className='ml-2 my-auto fa-lg text-primary-700'/>
      <div className={`absolute bottom-0 hidden group-hover:flex flex-col items-center mb-6 rounded-md ${ClassName}`}>
        <div className=" bg-primary-300 flex-col items-center p-1 rounded-md">
            <h1 className="font-semibold text-lg">Hva gjør &apos;Bilde til tekst&apos; ?</h1>
            <p className="relative mt-3 z-10 text-sm leading-none whitespace-no-wrap rounded-md">
            Denne funksjonen finner tekst i et valgt bilde og fyller ut all tekst i vårt tekstfelt.
            </p>
            <p className="relative mt-4 pb-1 z-10 leading-none whitespace-no-wrap rounded-md font-semibold">For å bruke denne funksjonen:</p>
            <p className="relative mt-4 pb-1 z-10 leading-none whitespace-no-wrap rounded-md"><span className="font-bold">1.</span> Klikk på &apos;Hent tekst fra bilde&apos;</p>
            <p className="relative mt-4 pb-1 z-10 leading-none whitespace-no-wrap rounded-md"><span className="font-bold">2.</span> Velg et bilde med teksten du vil bruke</p>
            <p className="relative mt-1 ml-4 pb-1 z-10 leading-none whitespace-no-wrap rounded-md">(Må være trykkbokstaver)</p>
            <p className="relative mt-4 pb-1 z-10 leading-none whitespace-no-wrap rounded-md"><span className="font-bold">3.</span> Klikk på &apos;Omgjør til tekst&apos;</p>
        </div>
        <div className="w-3 h-3 -mt-2 -ml-28 bg-primary-300 rotate-45 "/>
      </div>
    </div>
  );
};

export default OCRTooltip