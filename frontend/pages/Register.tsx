import { useState, ChangeEvent } from 'react';

const Register =()=> {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

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
    var postpassword;
    try { 
      if(password == repeatPassword){
        postpassword=password;
      }  
    } catch (error) {
      alert("Password's does not match")
    }
    const JSOndata= {
      "name": username,
      "password": postpassword,
      "email":email,
      "created": {
        "$date": new Date().setUTCHours(new Date().getUTCHours() + 1)
      }
    };  
    const options:RequestInit={
      headers:{
        'Content-Type':'application/json',
      },
      method:'POST',
      body:JSON.stringify(JSOndata),
    }
    console.log(JSOndata)
    const endpoint=("http://localhost:3000/api/user/registerUser")
    const response = await fetch(endpoint,options).catch()
    const result =response.json;
    console.log(result)
  };

  return (
    <div className="flex flex-col items-center mt-20 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
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
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
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
          <div className="mb-4">
            <label htmlFor="repeat-password" className="block text-gray-700 font-bold mb-2">
              Repeat Password
            </label>
            <input
              id="repeat-password"
              type="password"
              placeholder="Repeat your password"
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="flex justify-center">
            <button type="button" onClick={handleRegister} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
