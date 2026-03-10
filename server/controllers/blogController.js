import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// Add Blog
export const addBlog = async (req , res)=>{
    try{
        const {title , subTitle , description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;
        if(!title || !description || !category || !imageFile){
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
        // Use the admin's ID from auth middleware as the author
        await Blog.create({title,subTitle,description,category,image,isPublished, author: req.adminId})

        res.json({success: true,message:"Blog added sucessfully"})

    }catch(error){
        res.json({success: false,message:error.message})
    }
}

// Get All Blogs (public - shows only published)
export const getAllBlogs = async (req , res)=>{
    try{
        const blogs = await Blog.find({isPublished:true}).populate('author', 'email')
        res.json({success: true,blogs})
    }catch(error){
        res.json({success: false,message:error.message})
    }
}

// Get Blog By ID
export const getBlogById = async (req , res) =>{
    try{
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId).populate('author', 'email')
        if(!blog){
            return res.json({success: false, message: "Blog not found"})
        }
        res.json({success: true,blog})
    }catch(error){
        res.json({success: false,message:error.message})
    }
}

// Delete Blog (with ownership check)
export const deleteBlogById = async (req , res) =>{
    try{
        const {id} = req.body;
        // Verify ownership before deleting
        const blog = await Blog.findById(id);
        if (!blog || String(blog.author) !== String(req.adminId)) {
            return res.json({success: false, message: "Unauthorized or blog not found"});
        }
        await Blog.findByIdAndDelete(id);
        await Comment.deleteMany({blog: id});
        res.json({success: true,message:'Blog deleted SuccessFully'})
    }catch(error){
        res.json({success: false,message:error.message})
    }
}

// Toggle Publish Status (with ownership check)
export const togglePublish = async(req , res) =>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        // Verify ownership before toggling
        if (!blog || String(blog.author) !== String(req.adminId)) {
            return res.json({success: false, message: "Unauthorized or blog not found"});
        }
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
        const {blogId} = req.params;
        const comments = await Comment.find({blog:blogId,isApproved:true}).sort({createdAt: -1});
        res.json({success: true,comments}) 
    } catch (error) {
        res.json({success: false,message:error.message}) 
    }
}