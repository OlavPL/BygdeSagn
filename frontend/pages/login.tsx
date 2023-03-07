import { useState, ChangeEvent } from 'react';
import Link from 'next/link';

const Login =()=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Login 
  };

  return (
    <div className="flex flex-col items-center mt-20 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
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
          <div className="flex justify-between items-center">
            <button type="button" onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
            <Link href="/register" className ="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-pointer" role="menuitem" id="menu-item-3">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

