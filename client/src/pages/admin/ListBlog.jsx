// import React, { useState, useEffect } from 'react'
// import { blog_data } from '../../assets/assets'
// import BlogTableItem from '../../components/admin/BlogTableItem';
// import { useAppContext } from '../../../context/AppContext';
// import toast from 'react-hot-toast';

// const ListBlog = () => {


//   const [blogs, setBlogs] = useState([]);
//   const {axios} = useAppContext()

//   const fetchBlogs = async () => {
//     try {
//       const {data} = await axios.get('/api/admin/blogs')
//       if (data.success) {
//         setBlogs(data.blogs)
//       }
//       else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//         toast.error(error.message)
//     }
//   }


//   useEffect(() => {
//     fetchBlogs();
//   }, [])
//   return (
//     <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
//       <h1>All blogs</h1>
//       <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
//         <table className='w-full text-sm text-gray-500'>
//           <thead className='text-xs text-gray-600 text-left uppercase'>
//             <tr>
//               <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
//               <th scope='col' className='px-2 py-4'>Blog Title</th>
//               <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
//               <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
//               <th scope='col' className='px-2 py-4'>Actions</th>
//             </tr>
//           </thead>
//             {blogs.map((blog , index)=>{
//                 return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1}/>
//             })}
//         </table>
//       </div>
//     </div>
//   )
// }

// export default ListBlog
import React, { useState, useEffect } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios'; // FIX 1: 'axios' ko yahaan import karein

const ListBlog = () => {

  const [blogs, setBlogs] = useState([]);
  // FIX 2: Context se 'url' aur 'token' lein
  const { url, token } = useAppContext()

  const fetchBlogs = async () => {
    try {
      // FIX 3: Poora URL use karein aur headers mein 'token' bhein
      const { data } = await axios.get(`${url}/api/admin/blogs`, {
        headers: {
          authorization: token
        }
      });

      if (data.success) {
        setBlogs(data.blogs)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []) // '[]' add kiya taaki yeh ek hi baar chale

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1>All blogs</h1>
      <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 text-left uppercase'>
            <tr>
              <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
              <th scope='col' className='px-2 py-4'>Blog Title</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
              <th scope='col' className='px-2 py-4'>Actions</th>
            </tr>
          </thead>
          {/* FIX 4: <tbody> tag add kiya (React hydration error ke liye) */}
          <tbody>
            {blogs.map((blog, index) => {
              return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBlog