import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    // FIX: Backend URL ko port 4000 par set karein
    const url = "http://localhost:4000";
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState('');

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get(`${url}/api/blog/list`);
            if (data.success) {
                setBlogs(data.blogs);
            } else {
                console.error("Failed to fetch blogs:", data.message);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const contextValue = {
        url,
        token,
        setToken,
        blogs,
        input,
        setInput,
        fetchBlogs
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);