import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'

export const adminRegister = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.json({ success: false, message: "Admin already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        await newAdmin.save();

        const token = jwt.sign({ email: newAdmin.email }, process.env.JWT_SECRET);
        res.json({ success: true, token, message: "Admin registered successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
             return res.json({ success: false, message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
       const blogs = await Blog.find({ author: req.adminId }).sort({createdAt: -1}) 
        res.json({success: true,blogs})
    } catch (error) {
        res.json({success: false,message:error.message}) 
    }
}

export const getAllComments = async(req , res)=>{
    try {
        // First get all blog IDs belonging to this admin
        const adminBlogs = await Blog.find({ author: req.adminId }).select('_id');
        const blogIds = adminBlogs.map(b => b._id);
        const comments = await Comment.find({ blog: { $in: blogIds } }).populate("blog").sort({createdAt: -1})
        res.json({success: true,comments})
    } catch (error) {
        res.json({success: false,message:error.message}) 
    }
}

export const getDashboard = async (req, res) => {
  try {
    const adminId = req.adminId;
    const recentBlogs = await Blog.find({ author: adminId }).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments({ author: adminId });
    
    // Count comments only on this admin's blogs
    const adminBlogs = await Blog.find({ author: adminId }).select('_id');
    const blogIds = adminBlogs.map(b => b._id);
    const comments = await Comment.countDocuments({ blog: { $in: blogIds } }); 
    const drafts = await Blog.countDocuments({ author: adminId, isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    // Verify the comment belongs to one of this admin's blogs
    const comment = await Comment.findById(id).populate('blog');
    if (!comment || String(comment.blog.author) !== String(req.adminId)) {
      return res.json({ success: false, message: "Unauthorized or comment not found" });
    }
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    // Verify the comment belongs to one of this admin's blogs
    const comment = await Comment.findById(id).populate('blog');
    if (!comment || String(comment.blog.author) !== String(req.adminId)) {
      return res.json({ success: false, message: "Unauthorized or comment not found" });
    }
    await Comment.findByIdAndUpdate(id,{isApproved: true});
    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};