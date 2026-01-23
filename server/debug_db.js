import 'dotenv/config'
import mongoose from 'mongoose'
import Blog from './models/Blog.js'

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/quickblog`)
        console.log("DB Connected")
    } catch(err) {
        console.error("DB Error", err)
    }
}

const run = async () => {
    await connectDB();
    const blogs = await Blog.find({}).sort({createdAt: -1});
    console.log("Total Blogs:", blogs.length);
    blogs.forEach((b, i) => {
        console.log(`${i+1}. ${b.title} | ${b.createdAt}`);
    });
    process.exit();
}

run();
