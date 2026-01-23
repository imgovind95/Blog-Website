// // import fs from 'fs'
// // import imagekit from '../configs/imageKit.js';
// // import Blog from '../models/Blog.js';
// // import Comment from '../models/Comment.js';

// // export const addBlog = async (req , res)=>{
// //     try{
// //         const {title , subtitle , description, category, isPublished} = JSON.parse(req.body.blog);
// //         const imageFile = req.file;
// //         if(!title || !description || !category || !imageFile){
// //            return res.json({success: false, message : "Missing required fields"}) 
// //         }

// //         const fileBuffer = fs.readFileSync(imageFile.path)
// //         // upload image to imagekit
// //         const response = await imagekit.upload({
// //             file: fileBuffer,
// //             fileName:imageFile.originalname,
// //             folder: "/blogs"
// //         })

// //         //optimization through imagekit URL transformation
// //         const optimizedImageUrl = imagekit.url({
// //             path: response.filePath,
// //             transformation: [
// //                 {quality:'auto'},//Auto compression
// //                 {format:'webp'},//convert to modern format
// //                 {width:'1280'} //width resizing
// //             ]
// //         })

// //         // --- YEH HAI FIX ---
// //         // 'iamge' (typo) ko 'image' (sahi) se badal diya
// //         const image = optimizedImageUrl;
// //         await Blog.create({title,subTitle,description,category,image,isPublished})
// //         // --- FIX KHATAM ---

// //         res.json({success: true,message:"Blog added sucessfully"})

// //     }catch(error){
// //         res.json({success: false,message:error.message})
// //     }
// // }

// // export const getAllBlogs = async (req , res)=>{
// //     try{
// //         const blogs = await Blog.find({isPublished:true})
// //         res.json({success: true,blogs})

// //     }catch(error){
// //         res.json({success: false,message:error.message})
// //   _}
// // }

// // export const getBlogById = async (req , res) =>{
// //     try{
// //         const {blogId} = req.params;
// //         const blog = await Blog.findById(blogId)
// //         if(!blog){
// //             return res.json({success: false, message: "Blog not found"})
// //         }
// //         res.json({success: true,blog})

// //     }catch(error){
// //         res.json({success: false,message:error.message})
// //     }
// // }
// // export const deleteBlogById = async (req , res) =>{
// //     try{
// //         const {id} = req.body;
// //         await Blog.findByIdAndDelete(id);

// //         await Comment.deleteMany({blog: id});
// //         res.json({success: true,message:'Blog deleted SuccessFully'})

// //     }catch(error){
// //         res.json({success: false,message:error.message})
// //     }
// // }

// // export const togglePublish = async(req , res) =>{
// //     try {
// //         const {id} = req.body;
// //         const blog = await Blog.findById(id);
// //         blog.isPublished = !blog.isPublished;
// //         await blog.save();
// //         res.json({success: true,message:'Blog status updated'})
// //     } catch (error) {
// //         res.json({success: false,message:error.message}) 
// //     }
// // }

// // export const addComment = async(req , res)=>{
// //     try {
// //        const {blog,name,content} = req.body;
// //        await Comment.create({blog, name,content});
// //         res.json({success: true,message:'Comments Added for review'}) 

// //     } catch (error) {
// //         res.json({success: false,message:error.message}) 
// //         
// //     }
// // }

// // export const getBlogComments = async(req , res)=>{
// //     try {
// //        const {blogId} = req.body;
// //         const comments = await Comment.find({blog:blogId,isApproved:true}).sort({createdAt: -1});
// //         res.json({success: true,comments}) 
// //     } catch (error) {
// //         res.json({success: false,message:error.message}) 
// //     }
// // }
// import fs from 'fs'
// import imagekit from '../configs/imageKit.js';
// import Blog from '../models/Blog.js';
// import Comment from '../models/Comment.js';

// export const addBlog = async (req , res)=>{
//     try{
//         const {title , subTitle , description, category, isPublished} = JSON.parse(req.body.blog);
//         const imageFile = req.file;
//         if(!title || !description || !category || !imageFile){
//            return res.json({success: false, message : "Missing required fields"}) 
//         }

//         const fileBuffer = fs.readFileSync(imageFile.path)
//         const response = await imagekit.upload({
//             file: fileBuffer,
//             fileName:imageFile.originalname,
//             folder: "/blogs"
//         })

//         const optimizedImageUrl = imagekit.url({
//             path: response.filePath,
//             transformation: [
//                 {quality:'auto'},
//                 {format:'webp'},
//                 {width:'1280'}
//             ]
//         })

//         const image = optimizedImageUrl;
//         await Blog.create({title,subTitle,description,category,image,isPublished})
//         res.json({success: true,message:"Blog added sucessfully"})

//     }catch(error){
//         res.json({success: false,message:error.message})
//     }
// }

// export const getAllBlogs = async (req , res)=>{
//     try{
//         const blogs = await Blog.find({isPublished:true})
//         res.json({success: true,blogs})

//     }catch(error){
//         res.json({success: false,message:error.message})
//     } // <-- Yahaan se stray '_' hata diya gaya hai
// }

// export const getBlogById = async (req , res) =>{
//     try{
//         const {blogId} = req.params;
//         const blog = await Blog.findById(blogId)
//         if(!blog){
//             return res.json({success: false, message: "Blog not found"})
//         }
//         res.json({success: true,blog})

//     }catch(error){
//         res.json({success: false,message:error.message})
//     }
// }
// export const deleteBlogById = async (req , res) =>{
//     try{
//         const {id} = req.body;
//         await Blog.findByIdAndDelete(id);

//         await Comment.deleteMany({blog: id});
//         res.json({success: true,message:'Blog deleted SuccessFully'})

//     }catch(error){
//         res.json({success: false,message:error.message})
//     }
// }

// export const togglePublish = async(req , res) =>{
//     try {
//         const {id} = req.body;
//         const blog = await Blog.findById(id);
//         blog.isPublished = !blog.isPublished;
//         await blog.save();
//         res.json({success: true,message:'Blog status updated'})
//     } catch (error) {
//         res.json({success: false,message:error.message}) 
//     }
// }

// export const addComment = async(req , res)=>{
//     try {
//        const {blog,name,content} = req.body;
//        await Comment.create({blog, name,content});
//         res.json({success: true,message:'Comments Added for review'}) 

//     } catch (error) {
//         res.json({success: false,message:error.message}) 
//         
//     }
// }

// export const getBlogComments = async(req , res)=>{
//     try {
//        const {blogId} = req.body;
//         const comments = await Comment.find({blog:blogId,isApproved:true}).sort({createdAt: -1});
//         res.json({success: true,comments}) 
//     } catch (error) {
//         res.json({success: false,message:error.message}) 
//     }
// }
import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// Add Blog
export const addBlog = async (req , res)=>{
    try{
        const {title , subTitle , description, category, isPublished, author} = JSON.parse(req.body.blog);
        const imageFile = req.file;
        if(!title || !description || !category || !imageFile || !author){
           return res.json({success: false, message : "Missing required fields"}) 
        }

        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName:imageFile.originalname,
            folder: "/blogs"
        })

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality:'auto'},
                {format:'webp'},
                {width:'1280'} 
            ]
        })

        const image = optimizedImageUrl;
        await Blog.create({title,subTitle,description,category,image,isPublished,author})

        res.json({success: true,message:"Blog added sucessfully"})

    }catch(error){
        res.json({success: false,message:error.message})
    }
}

// Get All Blogs
export const getAllBlogs = async (req , res)=>{
    try{
        const blogs = await Blog.find({isPublished:true})
        res.json({success: true,blogs})
    }catch(error){
        res.json({success: false,message:error.message})
    }
}

// Get Blog By ID
export const getBlogById = async (req , res) =>{
    try{
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success: false, message: "Blog not found"})
        }
        res.json({success: true,blog})
    }catch(error){
        res.json({success: false,message:error.message})
    }
}

// Delete Blog
export const deleteBlogById = async (req , res) =>{
    try{
        const {id} = req.body;
        await Blog.findByIdAndDelete(id);
        await Comment.deleteMany({blog: id});
        res.json({success: true,message:'Blog deleted SuccessFully'})
    }catch(error){
        res.json({success: false,message:error.message})
    }
}

// Toggle Publish Status
export const togglePublish = async(req , res) =>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true,message:'Blog status updated'})
    } catch (error) {
        res.json({success: false,message:error.message}) 
    }
}

// Add Comment
export const addComment = async(req , res)=>{
    try {
       const {blog,name,content} = req.body;
       await Comment.create({blog, name,content});
        res.json({success: true,message:'Comments Added for review'}) 
    } catch (error) {
        res.json({success: false,message:error.message}) 
    }
}

// Get Blog's Comments
export const getBlogComments = async(req , res)=>{
    try {
        // --- YEH HAI FIX ---
        // 'req.body' ki jagah 'req.params' ka istemal karein
        const {blogId} = req.params;
        const comments = await Comment.find({blog:blogId,isApproved:true}).sort({createdAt: -1});
        res.json({success: true,comments}) 
    } catch (error) {
        res.json({success: false,message:error.message}) 
    }
}