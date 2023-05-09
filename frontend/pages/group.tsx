import { NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '@/pages/_app';
import Link from 'next/link';
import Gravatar from 'react-gravatar';

interface MemberData {
  name: string;
  hoved: string;
  sekundær: string;
  roles: string[];
}

const group: NextPage = () => {
  const { title, setTitle } = useContext(AppContext);

  const memberData: MemberData[] = [
    {
      name: 'Herman Simonsen',
      hoved: 'herman.fsi@gmail.com',
      sekundær:'46779515',
      roles: ['Prosjekt Leder', 'Brukerstøtte'],
    },
    {
      name: 'Olav Pålerud Lille-Østerholt',
      hoved: 'olavpl.div@gmail.com',
      sekundær:'olavlilleosterholt@hotmail.com',
      roles: ['Kode Leder','Analyse'],
    },
    {
      name: 'John Ivar Lilleøren Hagene',
      hoved: '243333@usn.no',
      sekundær:'41511456',
      roles: ['Dokumentasjons ansvarlig','HR'],
    },
  ];

  useEffect(() => {
    setTitle('Gruppen');
  }, [setTitle]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {memberData.map((member, index) => (
        <div key={index} className="mb-6 bg-white rounded-md p-4 flex items-center">
          <Gravatar email={member.hoved} size={60} className="mr-4 rounded-full" />
          <div>
            <h3 className="text-lg font-medium">{member.name}</h3>
            <div className="mt-2">
              {member.roles.map((role, roleIndex) => (
                <span key={roleIndex} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{role}</span>
              ))}
            </div>
            <div className="mt-2 text-gray-700 text-sm">
              <p className="mb-1">Hoved: {member.hoved}</p>
              <p>Sekundær: {member.sekundær
              }</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default group;
