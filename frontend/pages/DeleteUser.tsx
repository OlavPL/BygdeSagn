import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/pages/_app';
import { useSession, signOut, getSession } from 'next-auth/react';
const DeleteUser: NextPage = () => {
  const { title, setTitle } = useContext(AppContext);
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { data: session } = useSession({ required: true });
  const handleDeleteUser = async () => {    
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        body: JSON.stringify({ name:session?.user?.name }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      if (response.ok) {
        router.push('/');
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  useEffect(() => {
    setTitle('Delete User');
  }, [setTitle]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl font-medium mb-4">Er du sikker på at du vil slette brukeren din?</h2>
      <p className="text-gray-600 mb-4">
        Denne handlingen gjelder kun for Bygde Sagn kontoer og kan ikke tilbakestilles, all dataen din vil bli slettet.
      </p>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
        onClick={() => setShowConfirmation(true)}
      >
        Slett bruker
      </button>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-md p-6">
            <p className="text-xl mb-4">Er du sikker på at du vil slette brukeren din?</p>
            <p className="text-gray-600 mb-4">Denne handlingen kan ikke tilbake stilles og brukeren vil bli permanent slettet.</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded mr-2"
                onClick={() => setShowConfirmation(false)}
              >
                Angre
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                onClick={handleDeleteUser}
              >
                Slett bruker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
