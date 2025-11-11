import React from 'react';
import { assets } from '../../assets/assets';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const Layout = () => {
  const navigate = useNavigate();
  const { setToken } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    if (setToken) setToken(null);
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen">
      {/* Top Navbar */}
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200 bg-white sticky top-0 z-10">
        <img
          src={assets.logo}
          alt="Quickblog"
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Sidebar + Main Content */}
      <div className="grid grid-cols-[250px_1fr]">
        <div className="min-h-[calc(100vh-70px)] border-r border-gray-200">
          <Sidebar />
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

