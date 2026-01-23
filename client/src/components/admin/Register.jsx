// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAppContext } from '../../../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const Register = () => {
//     const navigate = useNavigate();
//     const { setToken, url } = useAppContext();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${url}/api/admin/register`, {
//                 email,
//                 password
//             });

//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 const realToken = response.data.token;
//                 setToken(realToken);
//                 localStorage.setItem("token", realToken);
//                 navigate('/admin/dashboard');
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error("Registration failed: " + error.message);
//         }
//     };

//     return (
//         <div className='flex items-center justify-center h-screen'>
//             <div className='w-full max-w-sm p-6 border border-indigo-500/30 shadow-xl shadow-indigo-500/15 rounded-lg'>
//                 <div className='flex flex-col items-center justify-center'>
//                     <div className='w-full py-6 text-center'>
//                         <h1 className='text-3xl font-bold'>
//                             <span className='text-indigo-600'>Create</span> Admin
//                         </h1>
//                         <p className='font-light'>Create an account to access the panel</p>
//                     </div>
//                     <form onSubmit={handleSubmit} className="w-full">
//                         <div className='flex flex-col'>
//                             <label className='font-medium'>Email</label>
//                             <input
//                                 type="email"
//                                 required
//                                 placeholder='your email id'
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 value={email}
//                                 className='border-b-2 border-gray-300 p-2 outline-none mb-6'
//                             />
//                         </div>
//                         <div className='flex flex-col'>
//                             <label className='font-medium'>Password</label>
//                             <input
//                                 type="password"
//                                 required
//                                 placeholder='your password'
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 value={password}
//                                 className='border-b-2 border-gray-300 p-2 outline-none mb-6'
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className='w-full py-3 font-medium bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-all'
//                         >
//                             Create Account
//                         </button>
//                     </form>
//                     <p className='text-center text-sm mt-4 text-gray-600'>
//                         Already have an account? <Link to="/login" className="text-blue-500 hover:underline font-medium">Login here</Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { setToken, url } = useAppContext(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/admin/register`, { email, password });

      if (response.data.success) {
        toast.success(response.data.message);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate('/admin');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Registration failed: " + error.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
      <div className='w-full max-w-sm p-8 border border-gray-200 shadow-lg rounded-xl bg-white'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full mb-8 text-center'>
            <h1 className='text-3xl font-bold'>
              <span className='text-indigo-600'>Create</span> Account
            </h1>
            <p className='text-gray-500 mt-2 font-light'>Set up your admin access</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className='flex flex-col mb-4'>
              <label className='font-medium text-gray-700 mb-1'>Email</label>
              <input 
                type="email" 
                required 
                placeholder='your email id'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='border border-gray-300 rounded-md p-2.5 outline-none focus:border-indigo-500 transition-colors'
              />
            </div>
            <div className='flex flex-col mb-6'>
              <label className='font-medium text-gray-700 mb-1'>Password</label>
              <input 
                type="password" 
                required 
                placeholder='your password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='border border-gray-300 rounded-md p-2.5 outline-none focus:border-indigo-500 transition-colors'
              />
            </div>
            <button 
              type="submit" 
              className='w-full py-3 font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all shadow-md'
            > 
              Create Account 
            </button>
          </form>
          <p className='text-center text-sm mt-6 text-gray-600'>
            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline font-medium">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;