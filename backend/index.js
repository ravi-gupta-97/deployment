import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';
dotenv.config();

// reference of express to app
const app = express();

// middlewares for app
app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// middlewares for routes for the api of app
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/post', postRoute);
app.use('/', (req, res) => {
    res.status(200).json("hello there");
})

// Database connection and starting the server
mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Database Connected & Server is running on port :${process.env.PORT}`);
    })
}).catch((error) => {
    console.log(error);
})
