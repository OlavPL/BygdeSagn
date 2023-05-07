import { NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '@/pages/_app';
import Link from 'next/link';
import Gravatar from 'react-gravatar';

interface MemberData {
  name: string;
  email: string;
  phone: string;
  roles: string[];
}

const contactus: NextPage = () => {
  const { title, setTitle } = useContext(AppContext);

  const memberData: MemberData[] = [
    {
      name: 'Herman Simonsen',
      email: 'herman.fsi@gmail.com',
      phone:'46779515',
      roles: ['Prosjekt Leder', 'Brukerstøtte'],
    },
    {
      name: 'Olav Pålerud Lille-Østerholt',
      email: 'olavpl.div@gmail.com',
      phone:'48000968',
      roles: ['Kode Leder','Analyse'],
    },
    {
      name: 'John Ivar Lilleøren Hagene',
      email: '243333@usn.no',
      phone:'41511456',
      roles: ['Dokumentasjons ansvarlig','HR'],
    },
  ];

  useEffect(() => {
    setTitle('Kontakt oss');
  }, [setTitle]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {memberData.map((member, index) => (
        <div key={index} className="mb-6 bg-white rounded-md p-4 flex items-center">
          <Gravatar email={member.email} size={60} className="mr-4 rounded-full" />
          <div>
            <h3 className="text-lg font-medium">{member.name}</h3>
            <div className="mt-2">
              {member.roles.map((role, roleIndex) => (
                <span key={roleIndex} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{role}</span>
              ))}
            </div>
            <div className="mt-2 text-gray-700 text-sm">
              <p className="mb-1">Epost: {member.email}</p>
              <p>Telefon: {member.phone}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default contactus;
