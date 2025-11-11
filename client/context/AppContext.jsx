// import React, { createContext, useContext, useEffect, useState } from "react";
// // 1. 'assets.js' se 'blog_data' ko delete kar dein (ab zaroorat nahi)
// import { assets } from "../src/assets/assets";
// // 2. Axios ko import karein
// import axios from 'axios';

// const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [blogs, setBlogs] = useState([]); // Default empty array
//   const [input, setInput] = useState('');

//   // 3. 'url' ko uncomment karein aur Port 3000 set karein
//   const url = "http://localhost:3000";

//   const fetchBlogs = async () => {
//     try {
//       // --- YEH HAI ASLI FIX ---
//       // 4. API call ko uncomment (enable) karein
//       const response = await axios.get(`${url}/api/blog/list`);
//       // 5. Database se aaye blogs ko state mein set karein
//       setBlogs(response.data.blogs);
//       // --- FIX KHATAM ---

//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };

//   useEffect(() => {
//     // Component load hote hi blogs fetch karein
//     fetchBlogs();
//   }, []); // '[]' taaki yeh sirf ek baar chale

//   const contextValue = {
//     token,
//     setToken,
//     blogs, // Ab yeh 'blogs' array database se aayega
//     input,
//     setInput,
//     fetchBlogs,
//     url // 'url' ko context mein provide karein
//   };

//   return (
//     <AppContext.Provider value={contextValue}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   return useContext(AppContext);
// };
import React, { createContext, useContext, useEffect, useState } from "react";
import { blog_data } from "../src/assets/assets"; 
import axios from 'axios'; // ✅ Import axios

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [blogs, setBlogs] = useState([]); 
  const [input, setInput] = useState(''); 

  const url = "http://localhost:3000"; // ✅ Your backend URL

  // ✅ Create a reusable axios instance (this is the main fix)
  const api = axios.create({
    baseURL: url,
    headers: {
      Authorization: token ? token : '',
    },
  });

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/api/blog/list');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs(blog_data);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const contextValue = {
    axios: api,   // ✅ Added axios instance here (main fix)
    token,
    setToken,
    blogs, 
    input, 
    setInput, 
    fetchBlogs, 
    url
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
