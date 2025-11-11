import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import axios from 'axios'; // 1. Axios ko import karein
import { toast } from 'react-hot-toast'; // 2. Toast ko import karein

const Login = () => {
  const navigate = useNavigate();
  // 3. Context se 'setToken' aur 'url' dono lein
  const { setToken, url } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- YEH HAI ASLI LOGIN FIX ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", email, password);

    try {
      // 4. Asli Login API ko call karein
      const response = await axios.post(`${url}/api/admin/login`, {
        email,
        password
      });

      // 5. Agar login successful hua aur token mila
      if (response.data.success) {
        toast.success(response.data.message);
        const realToken = response.data.token;
        // 6. Asli token ko set karein
        setToken(realToken);
        localStorage.setItem("token", realToken);
        // 7. Dashboard par bhej dein
        navigate('/admin/dashboard');
      } else {
        // Agar password galat hai
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };
  // --- FIX KHATAM ---

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-indigo-500/30 shadow-xl shadow-indigo-500/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>
              <span className='text-indigo-600'>Admin</span> Login
            </h1>
            <p className='font-light'>Enter your credentials to access the admin panel</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className='flex flex-col'>
              <label className='font-medium'>Email</label>
              <input
                type="email"
                required
                placeholder='your email id'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-medium'>Password</label>
              <input
                type="password"
                required
                placeholder='your password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>
            <button
              _ type="submit"
              className='w-full py-3 font-medium bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-all'
            >
              Login
            </button>
            s       </form>
        </div>
      </div>
    </div>
  );
};

export default Login;