import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/pages/_app';

interface FaqData {
  question: string;
  answer: string;
}

const Faq: NextPage = () => {
    const { title, setTitle } = useContext(AppContext);

    const faqData: FaqData[] = [
      {
        question: 'Hva slags type informasjon lagrer dere og hva brukes den til?',
        answer: "Vi lagrer all informasjon som blir fylt inn når et sagn blir publisert, publiserte kommentarer og brukerens passord, epost og fornavn. Vi bruker sagn dataen for å kunne dele sagnene dine med resten av verden, bruker data brukes kun til å drifte tjenesten og selges ikke videre til tredjepart",
      },
      {
        question: 'Er det mulig å publiere bilder og videoer?',
        answer: 'Det er ikke mulig å publisere bilder og videoer',
      },
      {
        question: 'Hvem er eierne av BygdeSagn?',
        answer: 'Bygde Sagn er laget og eid av Herman Simonsen, Olav Pålerud Lille-Østerholt og John Ivar Lilleøren Hagene. ',
      },
      {
          question: 'Jeg ønsker å slette brukeren min, hvordan gjør jeg dette?',
          answer: 'Det er leit å høre at du ønsker å slette brukeren din, her er lenke: LINK HER ',
      },
      {
          question: 'Hvordan bruker dere cookies?',
          answer: "Vi bruker cookies til å huske innloggingsinformasjon og preferanser for å gjøre det lettere å bruke tjenesten vår. Du kan velge å blokkere eller slette cookies gjennom nettleserinnstillingene dine.",
      },
    ];
  
    const [dropdownIndex, setDropdownIndex] = useState(-1);
    
    useEffect(() => {
      setTitle("FAQ");
    }, [setTitle]);
    
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {faqData.map((item, index) => (
          <div key={index} className="mb-6 bg-white rounded-md p-4">
            <button
              className="flex justify-between items-center w-full focus:outline-none"
              onClick={() => setDropdownIndex(dropdownIndex === index ? -1 : index)}
            >
              <h3 className="text-lg font-medium">{item.question}</h3>
              <span>{dropdownIndex === index ? '▲' : '▼'}</span>
            </button>
            {dropdownIndex === index && (
              <p className="text-gray-600 mt-2">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    );
  };
  
export default Faq;
