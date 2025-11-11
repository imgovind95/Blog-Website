import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion, LayoutGroup } from 'framer-motion'
import BlogCard from './BlogCard';
import { useAppContext } from '../../context/AppContext';

const BlogList = () => {

  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext()

  const filteredBlogs = () => {

    // --- YEH HAI ASLI FIX ---
    // Agar 'blogs' undefined (ya null) hai, toh filtering mat karo, 
    // seedha ek khaali array return kar do.
    if (!blogs) {
      return [];
    }
    // --- FIX KHATAM ---

    if (input === '') {
      return blogs
    }
    return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <div>
      <LayoutGroup>
        <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>

          {blogCategories.map((item) => (
            <button
              key={item}
              onClick={() => setMenu(item)}
              className={`relative cursor-pointer px-4 py-1.5 
                ${menu === item ? 'text-white' : 'text-gray-500'}`}
            >
              {item}

              {menu === item && (
                <motion.div layoutId='underline'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className='absolute left-0 right-0 top-0 h-full -z-1 bg-blue-500 rounded-full'
                />
              )}
            </button>
          ))}

        </div>
      </LayoutGroup>

      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
          {/* Ab yeh line crash nahi hogi */}
          {filteredBlogs()
            .filter((blog) => menu === "All" ? true : blog.category === menu)
            .map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default BlogList