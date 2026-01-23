// import express from 'express'
// import 'dotenv/config'
// import cors from 'cors'
// import connectDB from './configs/db.js';
// import adminRouter from './routes/adminRoutes.js';
// import blogRouter from './routes/blogRoutes.js';

// //middleWare
// const app = express();
// await connectDB()
// app.use(cors())
// app.use(express.json())
// // Routes
// app.get('/',(req,res)=>res.send("API is working") )
// app.use('/api/admin', adminRouter)
// app.use('/api/blog', blogRouter)

// const PORT = process.env.PORT || 3000;

// app.listen(PORT,()=>{
//     console.log('Server is running On Port '+PORT)
// })

// export default app;
import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// Database connection ko invoke karein
const startServer = async () => {
    try {
        await connectDB();
        console.log("MongoDB Connected Successfully");
        
        // Middlewares
        app.use(cors());
        app.use(express.json());

        // Routes
        app.get('/', (req, res) => res.send("API is working"));
        app.use('/api/admin', adminRouter);
        app.use('/api/blog', blogRouter);

        // FIX: Port ko 4000 karein kyunki 3000 par frontend chal raha hai
        const PORT = process.env.PORT || 4000;

        app.listen(PORT, () => {
            console.log('Server is running On Port ' + PORT);
        });
    } catch (error) {
        console.log("Database connection error: ", error);
    }
}

startServer();

export default app;