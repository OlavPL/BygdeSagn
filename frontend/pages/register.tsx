import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import SimpleCrypto from "simple-crypto-js"
import { toast } from 'react-toastify';
import { ToastType, getToastOptions } from '@/controllers/toastController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faCheck, faTimes  } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';



const Register =()=> {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [TOSAccept, setTOSAccept] = useState(false)
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
  
  const handleRegister = async () => {
    if (!username || !email || !password || !repeatPassword) {
      toast.error("Venligst fyll ut alle felt", getToastOptions(ToastType.light, "error ikke fylt ut felt"))
      return
    }
  
    if (password.length < 10) {
      toast.error("Passord kan ikke være under 10 karakterer ", getToastOptions(ToastType.light, "lengde er kan ikke være under 10 "))
      return
    }
  
    if (password !== repeatPassword) {
      toast.error("Passord er ikke like", getToastOptions(ToastType.light, "Passord stemmer ikke overens"))
      return
    }

    if(!TOSAccept){
      toast.error("Vi kan ikke registrere deg uten at du godkjenner våre vilkår for bruk", getToastOptions(ToastType.light, "need TOSAccept"))
      return
    }
  
    // Check if email already exists in the database
    const emailCheckResponse = await fetch(`/api/user/?email=${email}`)
    const emailCheckResult = await emailCheckResponse.json()
  
    if (emailCheckResult.exists === true) {
      toast.error("E-postadresse allerede registrert", getToastOptions(ToastType.light, "E-postadresse allerede registrert"))
      return
    }
  
    const JSOndata = {
      "name": username,
      "password": password,
      "email": email,
      "created": {
        "$date": new Date(new Date().setUTCHours(new Date().getUTCHours() + 1))
      },
    }
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(JSOndata),
    }
  
    const response = await fetch("/api/user", options)
    const result = await response.json()
  
    if (response.ok) {
      router.push('/login');
      toast.success("Registrering fullført", getToastOptions(ToastType.light, "BrukerRegistrering fullført"))
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
        <div className="flex flex-col justify-center">
          <div className='flex flex-row justify-center '>
            <input type={'checkbox'} checked={TOSAccept} onChange={()=> setTOSAccept(!TOSAccept)} className='w-5'/>
            <p className='text-center ml-5'>Jeg er over 13 år og godkjenner {<br/>} BygdeSagn sine <Link href={"/cookies"}>vilkår for bruk</Link></p>
          </div>
          {/* <p>Ved å klikke på &quot;Registrer&quot; godtar du våre <Link href="/cookies" target="_blank"  className='text-blue-400'>vilkår for bruk</Link></p> */}
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
