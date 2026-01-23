import mongoose from "mongoose";

const blogschema = new mongoose.Schema({
    title : {type: String, required:true},
    subTitle: {type: String},
    description: {type: String , required: true},
    category: {type: String , required: true},
    image: {type: String , required: true},
    isPublished: {type: Boolean , required: true},
    author: {type: String, required: true, default: "Admin"}
},{timestamps:true})

const Blog = mongoose.model('blog',blogschema);

export default Blog