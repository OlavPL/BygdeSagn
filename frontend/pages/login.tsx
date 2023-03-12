import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'

const Login =()=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {data: session} = useSession()

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

  if(session) {
    <div>
        <p>Welcome, {session.user?.email}</p>
        <button onClick={()=> signOut()}>Sign out</button>
      </div>
  }
  else {
    return (
      <div className="flex flex-col items-center mt-20 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2 w-32">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full p-2 border border-gray-400 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2 w-32">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-400 rounded-md"
              />
            </div>
            <div className="flex justify-between items-center">
              <button type="button" onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-32">
                Login
              </button>
              <p className="text-sm text-gray-500">Don't have an account? <Link href="/register" className ="text-blue-500 hover:underline cursor-pointer">Register here</Link></p>
            </div>
            <div className="my-4">
              <button onClick={handleGoogleLogin} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full">
                <span className="flex items-center justify-center">
                  <img src="/google-icon.svg" alt="Google icon" className="w-4 h-4 mr-2" />
                  Sign in with Google
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
