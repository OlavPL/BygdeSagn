import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/pages/_app';
import Link from 'next/link';

interface cookieData {
  title: string;
  info: string;
}
// Cookies side for å informere brukeren om vår bruk av Cookies
const Cookies: NextPage = () => {
    const { title, setTitle } = useContext(AppContext);
    
    const faqData: cookieData[] = [
        {
            title: 'Hva er Cookies?',
            info: "Cookies er små tekst filer som blir lagret på brukerens datamskin eller telefon når man bruker internett. De brukes av nettsteder for å huske brukerens preferanser, login informasjon, og annen informasjon.",
          },
      {
        title: 'Hvordan brukes Cookies?',
        info: "Cookies kan bli brukt til mange forskjellige formål, dette inkluderer også logging av brukerens oppførsel på nettstedet, og øke nettsidens ytelse.",
      },
      {
        title: 'Er Cookies trygt?',
        info: "Cookies i seg selv er trygge og kan ikke skade datamaskinen eller telefonen din. Men, de kan bli brukt til å spore aktiviteten du gjør på nettet og sammle inn personlig informasjon om deg, noe som kan være en personværns bekymring ",
      },
      {
        title: 'Hvordan kan jeg styre Cookies?',
        info: "Du kan styre cookies i gjennom nettleser instillingene dine. De fleste nettlesere kan velge å blokere og slette cookies, eller muligheter for å kontrollere hvordan de blir brukt av nettsidene. Men det er viktig å huske på at blokkering eller sletting av cookies kan ha innvirkning på bruker opplevelsen.",
      },
    ];
  
    const [dropdownIndex, setDropdownIndex] = useState(-1);
    
    useEffect(() => {
      setTitle("Cookies");
    }, [setTitle]);
    
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {faqData.map((item, index) => (
          <div key={index} className="mb-6 bg-white rounded-md p-4">
            <button
              className="flex justify-between items-center w-full focus:outline-none"
              onClick={() => setDropdownIndex(dropdownIndex === index ? -1 : index)}
            >
              <h3 className="text-lg font-medium">{item.title}</h3>
              <span>{dropdownIndex === index ? '▲' : '▼'}</span>
            </button>
            {dropdownIndex === index && (
              <p className="text-gray-600 mt-2">{item.info}</p>
            )}
          </div>
        ))}
      </div>
    );
  };
  
export default Cookies;
