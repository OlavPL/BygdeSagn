import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import Link from 'next/link';

interface ICookiePopup{
  stateValue?: boolean
  setStateValue?: (e:boolean)=> void
}
const CookiePopup = ({stateValue,setStateValue}:ICookiePopup) => {
  const [showPopup, setShowPopup] = useState(stateValue? stateValue : false)

  const handleAccept = (cookieChoise:number) => {
    switch (cookieChoise) {
      case 1:
        Cookies.set('cookieAcceptance', '1', { expires: 365 , SameSite:'lax'});
        break;

      case 0:
        Cookies.set('cookieAcceptance', '0', { expires: 365 , SameSite:'lax'});
        break;
        
      default:
        Cookies.set('cookieAcceptance', '-1', { expires: 365 , SameSite:'lax'});
        break;
    }

    Cookies.set('showPopup', 'false', { expires: 365 , SameSite:'lax'});
    if(setStateValue != undefined)
      setStateValue(false)
    else 
      setShowPopup(false)
  };

  useEffect(() => {
    if(stateValue === undefined)
      setShowPopup(!Cookies.get('showPopup'))
    else{
      setShowPopup(stateValue)
    }
  }, [stateValue])
  

  return (
    <div className="fixed bottom-0 w-full items-center ">
      {showPopup && 
        <div className="flex flex-col mx-2 md:mx-auto max-w-screen-md bg-gray-100 rounded border-black border-2 p-4 shadow-lg">
            <p className="text-gray-800 text-center">
              Hei! Vi bruker noen såkalte &apos;Cookies&apos; for å håndtere enktelte deler av nettsiden og ber om din tillatelse til å gjøre dette.
              <Link href={"/cookies"} className='text-blue-500 font-semibold pl-5'>Lær mer</Link>
            </p>
            <div className='flex flex-row'>
              <button
                className="bg-gradient-to-r from-primary-400 to-secondary-400 hover:from-primary-500 hover:to-secondary-600 text-white font-bold py-2 px-4 rounded mt-4 mx-auto"
                onClick={() => handleAccept(1)}
              >
                Ja til alle
              </button>
              <button
                className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded mt-4 mx-auto"
                onClick={() => handleAccept(0)}
              >
                Bare nødvendige
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mt-4 mx-auto"
                onClick={() => handleAccept(-1)}
              >
                Nei takk!
              </button>
            </div>
        </div>
      }
    </div>
  );
}

export default CookiePopup;