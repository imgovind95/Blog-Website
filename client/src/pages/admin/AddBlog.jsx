// import React, { useEffect, useState, useRef } from 'react'

// import { assets, blogCategories } from '../../assets/assets' 
// import Quill from 'quill';
// import axios from 'axios'; 
// import { useAppContext } from '../../../context/AppContext'; 
// import { toast } from 'react-hot-toast';

// const AddBlog = () => {
//   const[isAdding, setIsAdding] = useState(false)
//   const editorRef = useRef(null)
//   const quillRef = useRef(null)
//   const [image, setImage] = useState(false);
//   const [title, setTitle] = useState('');
//   const [SubTitle, setSubTitle] = useState('');
//   const [category, setcategory] = useState('');
//   const [isPublished, setisPublished] = useState(false);

//   const { token, url } = useAppContext(); 

//   const generateContent = async () => {
//     // ...
//   }

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     setIsAdding(false)

//     const description = quillRef.current.root.innerHTML;

//     const formData = new FormData();
//     formData.append('image', image); 

//     const blogData = {
//       title,
//       subTitle: SubTitle,
//       description,
//       category,
//       isPublished
//     }

//     formData.append('blog', JSON.stringify(blogData));

//     try {
//       const response = await axios.post(`${url}/api/blog/add`, formData, {
//         headers: {
//           authorization: token
//         }
//       });

//       if(response.data.success){
//         toast.success(response.data.message);
//         setImage(false);
//         setTitle('');
//         setSubTitle('');
//         setcategory('Startup');
//         quillRef.current.root.innerHTML = '';
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Error adding blog: " + error.message);
//     }
//   }

//   useEffect(() => {
//     if (!quillRef.current && editorRef.current) {
//       quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
//     }
//   }, [])

//   return (
//     <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
//       <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

//         <p>Upload thumbnail</p>
//         <label htmlFor="image">
//           <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
//           <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
//         </label>
//         <p className='mt-4'>Blog title</p>
//         <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setTitle(e.target.value)} value={title} />

//         <p className='mt-4'>Sub title</p>
//         <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setSubTitle(e.target.value)} value={SubTitle} />

//         <p className='mt-4'>Blog Description</p>
//         <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
//           <div ref={editorRef}></div>
//           <button type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
//         </div>
//         <p className='mt-4'>Blog category</p>
//         <select 
//           name="category" 
//           className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded cursor-pointer'
//           value={category}
//           onChange={(e) => setcategory(e.target.value)}
//         >
//           <option value="">Select category</option>
//           {blogCategories.map((item, index) => (
//             <option key={index} value={item}>{item}</option>
//           ))}
//         </select>
//         <div className='flex gap-2 mt-4'>
//           <p>Publish Now</p>
//           <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e=>setisPublished(e.target.checked)}/>
//         </div>
//           <button disabled = {isAdding} type="submit" className='mt-8 w-40 h-10 bg-blue-500 text-white rounded cursor-pointer text-sm'>
//             {
//             isAdding ? 'Adding..':'Add Blog'
//             }
//             </button>
//       </div>
//     </form>
//   )
// }

// export default AddBlog

import React, { useEffect, useState, useRef } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import axios from 'axios';
import { useAppContext } from '../../../context/AppContext';
import { toast } from 'react-hot-toast';

const AddBlog = () => {
  const [isAdding, setIsAdding] = useState(false)
  const editorRef = useRef(null)
  const quillRef = useRef(null)
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [SubTitle, setSubTitle] = useState('');
  const [author, setAuthor] = useState('Admin'); // Default author name
  const [category, setcategory] = useState('Startup');
  const [isPublished, setisPublished] = useState(false);

  const { token, url } = useAppContext();

  const generateContent = async () => {
    // ...
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setIsAdding(true);

    const description = quillRef.current.root.innerHTML;
    const formData = new FormData();
    formData.append('image', image);

    const blogData = {
      title,
      subTitle: SubTitle,
      description,
      category,
      isPublished,
      author
    }

    formData.append('blog', JSON.stringify(blogData));

    try {
      const response = await axios.post(`${url}/api/blog/add`, formData, {
        headers: {
          authorization: token
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setImage(false);
        setTitle('');
        setSubTitle('');
        setAuthor('Admin');
        setcategory('Startup');
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding blog: " + error.message);
    } finally {
      setIsAdding(false);
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>
        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setTitle(e.target.value)} value={title} />

        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setSubTitle(e.target.value)} value={SubTitle} />

        <p className='mt-4'>Blog Author</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setAuthor(e.target.value)} value={author} />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          <button type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
        </div>
        <p className='mt-4'>Blog category</p>
        <select
          name="category"
          className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded cursor-pointer'
          value={category}
          onChange={(e) => setcategory(e.target.value)}
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e => setisPublished(e.target.checked)} />
        </div>
        <button disabled={isAdding} type="submit" className='mt-8 w-40 h-10 bg-blue-500 text-white rounded cursor-pointer text-sm disabled:bg-gray-400'>
          {isAdding ? 'Adding..' : 'Add Blog'}
        </button>
      </div>
    </form>
  )
}

export default AddBlog