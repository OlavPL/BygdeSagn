import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/pages/_app';
import Link from 'next/link';
import Gravatar from 'react-gravatar';

interface MemberData {
  firstName: string;
  lastName: string;
  hoved: string;
  sekundær: string;
  roles: string[];
}
const memberData: MemberData[] = [
  {
    firstName: 'Herman',
    lastName: 'Simonsen',
    hoved: 'herman.fsi@gmail.com',
    sekundær:'46779515',
    roles: ['Prosjekt Leder', 'Brukerstøtte'],
  },
  {
    firstName: 'Olav Pålerud',
    lastName: 'Lille-Østerholt',
    hoved: 'olavpl.div@gmail.com',
    sekundær:'olavlilleosterholt@hotmail.com',
    roles: ['Kode Leder','Analyse'],
  },
  {
    firstName: 'John Ivar ',
    lastName: 'Lilleøren Hagene',
    hoved: '243333@usn.no',
    sekundær:'41511456',
    roles: ['Dokumentasjons ansvarlig','HR'],
  },
];
interface FaqData {
  question: string;
  answer: string;
}
const faqData: FaqData[] = [
  {
    question: 'Hva er BygdeSagn?',
    answer: "Bygdesagn er en paltform som ønsker å gjøre sagn og historier fra lokalmiljøene tilgjengelig og synelig for alle på en enkel og brukervennlig måte",
  },
  {
    question: 'Hva slags type informasjon lagrer dere og hva brukes den til?',
    answer: "Vi lagrer all informasjon som blir fylt inn når et sagn blir publisert, publiserte kommentarer og brukerens passord, epost og fornavn. Vi bruker sagn dataen for å kunne dele sagnene dine med resten av verden, bruker data brukes kun til å drifte tjenesten og selges ikke videre til tredjepart",
  },
  {
    question: 'Er det mulig å publiere bilder og videoer?',
    answer: 'Det er ikke mulig å publisere bilder og videoer',
  },
  {
    question: 'Hvorfor vi lagde BygdeSagn?',
    answer: 'BygdeSagn er et bachelor prosjekt laget og eid av Herman Simonsen, Olav Pålerud Lille-Østerholt og John Ivar Lilleøren Hagene.',
  },
  {
      question: 'Hvordan bruker vi cookies?',
      answer: 'Vi bruker cookies til å huske innloggingsinformasjon og preferanser for å gjøre det lettere å bruke tjenesten vår. Du kan velge å blokkere eller slette cookies gjennom nettleserinnstillingene dine. Du kan lese mere om Cookies på vår Cookies side',
  },
];


const Group = () => {
  const { title, setTitle } = useContext(AppContext);
  const [dropdownIndex, setDropdownIndex] = useState(-1);

  
  useEffect(() => {
    setTitle('Om oss');
  }, [setTitle]);

  return (
    <div className="max-w-3x mx-auto px-4 sm:px-6 lg:px-8 justify-center mt-5">

      {/*   FAQ info   */}
      <h1 className='text-center text-lg font-semibold mb-2'>Spørsmål?</h1>
      <div className="max-w-3xl mx-auto space-y-5 mb-10">
        {faqData.map((item, index) => (
          <div key={index} className="bg-white rounded-md p-2">
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

      {/*   Kontakt info   */}
      <h1 className='text-center text-lg font-semibold mb-2'>Noe du lurer på?</h1>
      <div className="flex flex-col items-center justify-center sm:mx-auto p-2 bg-white rounded shadow max-w-3xl mb-10">
        <p className="text-lg mb-4">
          Om du har noen spørsmål, forslag til forbedringer eller ønsker å komme i kontakt med oss:
        </p>
        <p className="text-lg  mb-4">Send oss en e-post: <a href='mailto: bygdesagn@gmail.com' className="text-lg text-link">bygdesagn@gmail.com</a></p>
      </div>

      {/*   Gruppemedlemmer info   */}
      <h1 className='text-center text-lg font-semibold mb-2'>Gruppemedlemmene</h1>
      <div className='flex flex-col md:flex-row md:space-x-2 justify-center'>
        {memberData.map((member, index) => (
          <div key={index} className="mb-6 bg-white rounded-md p-4 flex items-center min-w-[270px]">
            <div className='w-full'>
              <div className='flex flex-row max-h-16'>
                <div>
                <p className="text-lg font-medium">{member.firstName}</p>
                <p className="text-lg font-medium">{member.lastName}</p>
                </div>
                <Gravatar email={member.hoved} size={60} className="rounded-full ml-auto" />
              </div>
              <div className="mt-2
            space-y-2">
                {member.roles.map((role, roleIndex) => (
                  <span key={roleIndex} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">{role}</span>
                ))}
              </div>
              <div className="mt-2 text-gray-700 text-sm">
                <p className="mb-1">Hoved: {member.hoved}</p>
                <p>Sekundær: {member.sekundær}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group;
