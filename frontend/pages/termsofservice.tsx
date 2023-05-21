import { NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '@/pages/_app';


// Terms and Services side
const TermsAndServices: NextPage = () => {
  const { title, setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle('Vilkår for bruk av tjeneste');
  }, [setTitle]);
  return (
<div className="flex flex-col items-center py-8">
        <div className="max-w-xl px-6 py-4 bg-gray-100 rounded-md shadow">
            <h2 className="text-lg font-medium text-gray-800">Velkommen til BygdeSagn!</h2>
                <p className="text-gray-800 leading-7 mt-4">
                    Vennligst les disse vilkårene og betingelsene nøye før du bruker tjenesten. Ved å bruke tjenesten aksepterer du disse vilkårene og betingelsene i sin helhet. Hvis du ikke godtar disse vilkårene og betingelsene, vennligst ikke bruk tjenesten.
                </p>
            <h2 className="text-lg font-medium text-gray-800 mt-6">Bruk av tjenesten</h2>
                <p className="text-gray-800 leading-7 mt-4">
                    Du kan bruke tjenesten kun til lovlige formål og i samsvar med disse vilkårene og betingelsene. Du samtykker i å ikke bruke tjenesten på en måte som kan skade, deaktivere eller forstyrre tjenesten eller annen brukers tilgang til tjenesten. Du samtykker også i å ikke prøve å få uautorisert tilgang til tjenesten eller annen brukers konto eller informasjon.
                </p>
            <h2 className="text-lg font-medium text-gray-800 mt-6">Personvern</h2>
                <p className="text-gray-800 leading-7 mt-4">
                    Vi tar personvern på alvor. Vår personvernerklæring forklarer hvordan vi samler inn, bruker og beskytter dine personlige opplysninger. Ved å bruke tjenesten, samtykker du i vår personvernerklæring.
                </p>
            <h2 className="text-lg font-medium text-gray-800 mt-6">Ansvarsfraskrivelse</h2>
                <p className="text-gray-800 leading-7 mt-4">
                    Tjenesten tilbys «som den er» og «som tilgjengelig», uten noen garantier eller betingelser, uttrykt eller underforstått. Vi gir ingen garantier for at tjenesten vil være tilgjengelig, feilfri, trygg eller pålitelig. Vi tar ikke ansvar for eventuelle tap eller skader som følge av bruk av tjenesten.
                </p>
            <h2 className="text-lg font-medium text-gray-800 mt-6">Endringer i vilkår og betingelser</h2>
                <p className="text-gray-800 leading-7 mt-4">
                    Vi forbeholder oss retten til å endre disse vilkårene og betingelsene når som helst, og det er ditt ansvar å holde deg oppdatert. Fortsatt bruk av tjenesten etter at endringer er gjort, vil anses som aksept av de nye vilkårene og betingelsene.
                </p>
            <h2 className="text-lg font-medium text-gray-800 mt-6">Avsluttende bestemmelser</h2>
                <p className="text-gray-800 leading-7 mt-4">
                Disse vilkårene og betingelsene utgjør hele avtalen mellom deg og BygdeSagn. Hvis en bestemmelse i disse vilkårene og betingelsene blir funnet å være ugyldig, skal den ugyldige eller ikke håndhevbare bestemmelsen erstattes av en gyldig og håndhevbar bestemmelse som ligner på den opprinnelige bestemmelsen så mye som mulig. Enhver unnlatelse fra vår side til å håndheve noen bestemmelse i disse vilkårene og betingelsene, skal ikke anses som en fraskrivelse av rettigheter eller bestemmelser.
                </p>
        </div>
    </div>
    );
};

export default TermsAndServices;
