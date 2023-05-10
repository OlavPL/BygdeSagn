import { NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '@/pages/_app';

const ContactUs: NextPage = () => {
  const { setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle('Kontakt oss');
  }, [setTitle]);

  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-xl px-6 py-4 bg-gray-100 rounded shadow">
      <p className="text-lg text-gray-600 mb-4">
        Om du har noen spørsmål, forslag til forbedringer eller ønsker å komme i kontakt med oss:
      </p>
      <ul className="list-disc ml-6 mb-6">
        <li className="text-lg text-gray-600">Email: bygdesagn@gmail.com</li>
      </ul>
    </div>
  );
};

export default ContactUs;
