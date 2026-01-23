import 'dotenv/config'
import mongoose from 'mongoose'
import Admin from './models/Admin.js' 
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Setup Data
const PORT = process.env.PORT || 4000;
const URL = `http://localhost:${PORT}`;

const run = async () => {
    // A. Connect to DB to ensure Admin exists or create token manually
    await mongoose.connect(`${process.env.MONGODB_URL}/quickblog`);
    
    // Create a dummy admin & token
    const email = "test_admin@example.com";
    const token = jwt.sign({email}, process.env.JWT_SECRET);
    console.log("Generated Token");

    // B. Prepare Payload
    const blogData = {
        title: "Test Blog " + Date.now(),
        subTitle: "Subtitle",
        description: "<p>Description</p>",
        category: "Technology",
        isPublished: true
    };

    const imagePath = path.join(__dirname, '../client/src/assets/blog_pic_1.png');
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
        console.error("Image file not found:", imagePath);
        process.exit(1);
    }
    const fileBuffer = fs.readFileSync(imagePath);
    const fileBlob = new Blob([fileBuffer], { type: 'image/png' });

    const formData = new FormData();
    formData.append('blog', JSON.stringify(blogData));
    formData.append('image', fileBlob, 'blog_pic_1.png');

    // C. Send Request
    console.log(`Sending POST to ${URL}/api/blog/add ...`);
    try {
        const res = await fetch(`${URL}/api/blog/add`, {
            method: 'POST',
            headers: {
                'Authorization': token
            },
            body: formData
        });
        const data = await res.json();
        console.log("Response:", data);
    } catch (error) {
        console.error("Fetch Error:", error);
    }

    mongoose.connection.close();
}

run();
