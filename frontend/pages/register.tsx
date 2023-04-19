import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import SimpleCrypto from "simple-crypto-js"
import { toast } from 'react-toastify';
import { ToastType, getToastOptions } from '@/components/controller/toastController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faCheck, faTimes  } from '@fortawesome/free-solid-svg-icons';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

const Register =()=> {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const router = useRouter()

  const [passwordLengthValid, setPasswordLengthValid] = useState(false)
  const [passwordNumberValid, setPasswordNumberValid] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  
  const handlePasswordFocus = () => setIsPasswordFocused(true)
  const handlePasswordBlur = () => setIsPasswordFocused(false)
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
  
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value
    setPassword(password)
    setPasswordLengthValid(password.length >= 10)
    setPasswordNumberValid(/\d/.test(password))
  }

  const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>) => setRepeatPassword(event.target.value)
  
  const handleRegister = async ()=> {

    if (!username || !email || !password || !repeatPassword) {
      toast.error("Venligst fyll ut alle felt", getToastOptions(ToastType.light, "error ikke fylt ut felt"))
      return
    }

    if(password !== repeatPassword) {
      toast.error("Passord er ikke like", getToastOptions(ToastType.light, "error passord stemmer ikke overens"))
      return
    }

    const JSOndata = {
      "name": username,
      "password": password,
      "email":email,
      "created": {
        "$date": new Date().setUTCHours(new Date().getUTCHours() + 1)
      },
    }
    const options:RequestInit={
      headers:{
        'Content-Type':'application/json',
      },
      method:'POST',
      body:JSON.stringify(JSOndata),
    }

    const response = await fetch("/api/user",options)
    const result = await response.json()

    if (response.ok) {
      router.push('/login'); 
      toast.success("Registrering fullført", getToastOptions(ToastType.light, "brukerRegistrering fullført"))
    } else {
      alert('Registration failed')
    }
  }

  return (
    <div className="flex flex-col items-center mt-20 min-h-screen">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="font-bold text-2xl flex justify-center min-w-full mb-4">
        <span className="text-primary-90">Registrering</span>
      </h1>
      <form>
        <label className="block text-gray-700 font-bold mb-2 w-full relative">
          Brukernavn
          <div className="flex border border-gray-400 rounded w-full focus-within:border-blue-500 border-2">
            <span className="p-2 rounded rounded-r-none border-r-0">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </span>
            <input
              id="username"
              type="text"
              placeholder="Brukernavn..."
              value={username}
              onChange={handleUsernameChange}
              className="grow rounded-l-none bg-white focus:outline-none border-l-0 rounded placeholder-textColor placeholder-opacity-50 w-full"/>
          </div>
        </label>
        <label className="block text-gray-700 font-bold mb-2 w-full relative">
          E-post
          <div className="flex border border-gray-400 rounded w-full focus-within:border-blue-500 border-2">
            <span className="p-2 rounded rounded-r-none border-r-0">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </span>
            <input
              id="email"
              type="email"
              placeholder="E-post..."
              value={email}
              onChange={handleEmailChange}
              className="grow rounded-l-none bg-white focus:outline-none border-l-0 rounded placeholder-textColor placeholder-opacity-50 w-full"/>
          </div>
        </label>
        <label className="block text-gray-700 font-bold mb-2 w-full relative">
          Passord
          <div className="flex border border-gray-400 rounded w-full focus-within:border-blue-500 border-2">
            <span className="p-2 rounded rounded-r-none border-r-0">
              <FontAwesomeIcon icon={faLock} size="lg" />
            </span>
            <input
              id="password"
              type="password"
              placeholder="Passord..."
              value={password}
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="grow rounded-l-none bg-white focus:outline-none border-l-0 rounded placeholder-textColor placeholder-opacity-50 w-full"/>
          </div>
          <div className="mt-1 text-sm" style={{ display: isPasswordFocused ? 'block' : 'none' }}>
            <div className="flex items-center">
              <FontAwesomeIcon icon={passwordLengthValid ? faCheck : faTimes} className={`mr-1 ${passwordLengthValid ? 'text-green-500' : 'text-red-500'}`} />
              <span>Minst 10 tegn</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={passwordNumberValid ? faCheck : faTimes} className={`mr-1 ${passwordNumberValid ? 'text-green-500' : 'text-red-500'}`} />
              <span>Må innehold en bokstav</span>
            </div>
          </div>
        </label>
        <label className="block text-gray-700 font-bold mb-2 w-full relative">
          Gjenta Passord
          <div className="flex border border-gray-400 rounded w-full focus-within:border-blue-500 border-2">
            <span className="p-2 rounded rounded-r-none border-r-0">
              <FontAwesomeIcon icon={faLock} size="lg" />
            </span>
            <input
              id="repeat-password"
              type="password"
              placeholder="Gjenta passord..."
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
              className="grow rounded-l-none bg-white focus:outline-none border-l-0 rounded placeholder-textColor placeholder-opacity-50 w-full"/>
          </div>
        </label>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleRegister}
            className="w-full text-white bg-primary-400 hover:bg-secondary-800 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 my-2">
            Registrer
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Register
