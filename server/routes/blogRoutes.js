// import express from 'express';
// import upload from '../middleware/Multer.js';
// import auth from '../middleware/auth.js';

// // YEH HAI FIX: 'addBlog' ko controller file se import karein
// import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';

// const blogRouter = express.Router();

// // Yeh line ab sahi se kaam karegi
// blogRouter.post("/add", upload.single('image'), auth, addBlog)
// blogRouter.get('/all',getAllBlogs);
// blogRouter.get('/:blogId',getBlogById);
// blogRouter.post('/toggle-publish',auth,togglePublish);
// blogRouter.post('/add-comment',addComment);
// blogRouter.post('/comments',getBlogComments);

// export default blogRouter;
// import express from 'express';
// import upload from '../middleware/Multer.js';
// import auth from '../middleware/auth.js';

// // 1. 'addBlog' ke saath-saath 'getAllBlogs' ko bhi import karein
// import { addBlog, getAllBlogs } from '../controllers/blogController.js';

// const blogRouter = express.Router();

// // 2. "/add" wala POST route (yeh aapke paas pehle se hai)
// blogRouter.post("/add", upload.single('image'), auth, addBlog);

// // 3. YEH HAI FIX: "/list" wala GET route add karein
// blogRouter.get("/list", getAllBlogs);

// export default blogRouter;
// import express from 'express';
// import upload from '../middleware/Multer.js';
// import auth from '../middleware/auth.js';

// // 1. Saare zaroori functions ko import kiya hai
// import { 
//     addBlog, 
//     getAllBlogs, 
//     getBlogById, 
//     getBlogComments,
//     deleteBlogById,
//     togglePublish,
//     addComment
// } from '../controllers/blogController.js';

// const blogRouter = express.Router();

// // --- YEH HAIN AAPKE POORE BLOG ROUTES ---

// // POST (Create)
// blogRouter.post("/add", upload.single('image'), auth, addBlog);

// // GET (Read)
// blogRouter.get("/list", getAllBlogs);
// blogRouter.get("/:blogId", getBlogById); // <-- FIX 1: Blog ID se get karne ke liye
// blogRouter.get("/comments/:blogId", getBlogComments); // <-- FIX 2: Comments get karne ke liye

// // POST (Update/Delete/Comment)
// blogRouter.post("/comment", addComment);
// blogRouter.delete("/delete", auth, deleteBlogById);
// blogRouter.put("/publish", auth, togglePublish);


// export default blogRouter;
import express from 'express';
import upload from '../middleware/Multer.js';
import auth from '../middleware/auth.js';

import { 
    addBlog, 
    getAllBlogs, 
    getBlogById, 
    getBlogComments,
    deleteBlogById,
    togglePublish,
    addComment
} from '../controllers/blogController.js';

const blogRouter = express.Router();

// --- YEH HAI SAHI ORDER ---

// GET (Read) - Specific routes hamesha pahle
blogRouter.get("/list", getAllBlogs);
blogRouter.get("/comments/:blogId", getBlogComments); // <-- Fix 1: Ise /:blogId se pahle rakha
blogRouter.get("/:blogId", getBlogById); // <-- Fix 2: Ise specific routes ke baad rakha

// POST (Create)
blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.post("/comment", addComment);

// DELETE & PUT (Update)
blogRouter.delete("/delete", auth, deleteBlogById);
blogRouter.put("/publish", auth, togglePublish);

// --- FIX KHATAM ---

export default blogRouter;