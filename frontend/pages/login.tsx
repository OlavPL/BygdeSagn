import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import React from 'react'
import {useSession, signIn, signOut,getSession} from 'next-auth/react'
import {NextRouter, useRouter } from "next/router"

const Login =(router: NextRouter)=> {
 //const{data}= useSession({required:true});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    
  }

  const handleGoogleLogin = () => {
    signIn('GoogleProvider')
  }


  const {data: session,status} = useSession()

  if(status==='authenticated') {
    
   
  }
  else {
    return (
      <div className="flex flex-col items-center mt-20 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Logg inn</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="Brukernavn" className="block text-gray-700 font-bold mb-2 w-32">
                Brukernavn
              </label>
              <input
                id="username"
                type="text"
                placeholder="Skriv inn brukernavn"
                value={username}
                onChange={handleUsernameChange}
                className="w-full p-2 border border-gray-400 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Passord" className="block text-gray-700 font-bold mb-2 w-32">
                Passord
              </label>
              <input
                id="password"
                type="password"
                placeholder="Skriv inn passord"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-400 rounded-md"
              />
            </div>
            <div className="flex justify-between items-center">
              <button type="button" onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-32">
                Logg inn
              </button>
              <div className='flex flex-col '>
                <p className="text-sm text-gray-500">Har du ikke bruker?</p>
                <Link href="/register" className ="text-blue-500 hover:underline cursor-pointer">Registrer deg her</Link>
              </div>
            </div>
            <div className="my-4">
              <button onClick={handleGoogleLogin} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full">
                <span className="flex items-center justify-center">
                  <img src="/googe.png" alt="Google icon" className="w-7 h-7 mr-5" />
                  Logg in med Google
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
}

export default Login;

/*
export const getServerSideProps = async (context:Context)=>{
    const session = await getSession(context);

    if(!session){
        return{
            redirect:{
               destination: '/login'
            }
        }
    }
    return{
        props:{session},
    }
} */