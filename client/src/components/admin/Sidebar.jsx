import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  return (
    // 'w-64' se width fix hai (yeh sahi hai)
    <div className='w-64 bg-[#f9fafb] border-r border-gray-200 min-h-[calc(100vh-70px)] py-5'>

      {/* --- Dashboard Link --- */}
      <NavLink
        to='/admin/dashboard'
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
${isActive ? "bg-indigo-100 border-r-4 border-indigo-500 text-indigo-700" : "text-gray-600"}`
        }
      >
        <img src={assets.home_icon} alt="" className='w-5 opacity-80' />
        <p>Dashboard</p>
      </NavLink>

      {/* --- Add Blogs Link --- */}
      <NavLink
        to='/admin/addBlog'
        className={({ isActive }) =>
          
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
 ${isActive ? "bg-indigo-100 border-r-4 border-indigo-500 text-indigo-700" : "text-gray-600"}`
        }
      >
        <img src={assets.add_icon} alt="" className='w-5 opacity-80' />
        <p>Add Blogs</p>
      </NavLink>
      <NavLink
        to='/admin/listBlog'
        className={({ isActive }) =>
          
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
 ${isActive ? "bg-indigo-100 border-r-4 border-indigo-500 text-indigo-700" : "text-gray-600"}`
        }
      >
        <img src={assets.list_icon} alt="" className='w-5 opacity-80' />
        <p>Blog lists</p>
      </NavLink>
      <NavLink
        to='/admin/comments'
        className={({ isActive }) =>
          
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
 ${isActive ? "bg-indigo-100 border-r-4 border-indigo-500 text-indigo-700" : "text-gray-600"}`
        }
      >
        <img src={assets.comment_icon} alt="" className='w-5 opacity-80' />
        <p>comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;