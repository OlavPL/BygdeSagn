import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import SimpleCrypto from "simple-crypto-js"
import { toast } from 'react-toastify';
import { ToastType, getToastOptions } from '@/components/controller/toastController';

const Register =()=> {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const router = useRouter();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

  const handleRegister = async ()=> {
    const secretKey =  "h9#E6CAjvzfN9"
    const simpleCrypto = new SimpleCrypto(secretKey)

    if (!username || !email || !password || !repeatPassword) {
      toast.error("Venligst fyll ut alle felt", getToastOptions(ToastType.light, "error ikke fylt ut felt"))
      return;
    }

    if(password !== repeatPassword) {
      toast.error("Passord er ikke like", getToastOptions(ToastType.light, "error passord stemmer ikke overens"))
      return;
    }

    const encryptedPassword = simpleCrypto.encrypt(password);

    const JSOndata = {
      "name": username,
      "password": encryptedPassword,
      "email":email,
      "created": {
        "$date": new Date().setUTCHours(new Date().getUTCHours() + 1)
      },
    };  
    const options:RequestInit={
      headers:{
        'Content-Type':'application/json',
      },
      method:'POST',
      body:JSON.stringify(JSOndata),
    }

    const response = await fetch("/api/user/registerUser",options);
    const result = await response.json();

    if (response.ok) {
      router.push('/login'); // redirect to login page if registration is successful
      toast.success("Registrering fullført", getToastOptions(ToastType.light, "brukerRegistrering fullført"))
    } else {
      alert('Registration failed');
    }
  }
  return (
    <div className="flex flex-col items-center mt-20 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Registrer deg</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Brukernavn
            </label>
            <input
              id="username"
              type="text"
              placeholder="Brukernavn..."
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              E-post
            </label>
            <input
              id="email"
              type="email"
              placeholder="E-post..."
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Passord
            </label>
            <input
              id="password"
              type="password"
              placeholder="Passord..."
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="repeat-password" className="block text-gray-700 font-bold mb-2">
              Gjenta Passord
            </label>
            <input
              id="repeat-password"
              type="password"
              placeholder="Gjenta passord..."
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="flex justify-center">
            <button type="button" onClick={handleRegister} className="w-full text-white bg-primary-400 hover:bg-secondary-800 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 my-2">
              Registrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
