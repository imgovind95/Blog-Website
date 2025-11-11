import React from 'react'
import { assets } from '../assets/assets'
// 1. useNavigate ko 'react-router-dom' se import karein
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {

  // 2. Context se SIRF 'token' lein
  const { token } = useAppContext();
  // 3. 'navigate' ko 'useNavigate()' hook se lein
  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>

      <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' />

      <button
        // 4. YEH HAI ASLI FIX (Logic ko badal diya)
        onClick={() => {
          // Agar token hai (logged in hain), toh admin dashboard par jaayein
          if (token) {
            navigate('/admin/dashboard');
          }
          // Agar token nahi hai (logged out hain), toh login page par jaayein
          else {
            navigate('/login');
          }
        }}
        className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-blue-500 text-white px-10 py-2.5 cursor-pointer hover:opacity-90 transition'
      >
        {/* Yeh logic aapka pehle se sahi tha */}
        {token ? 'Dashboard' : 'login'}
        <img src={assets.arrow} className='w-3' alt="arrow" />
      </button>

    </div>
  )
}

export default Navbar