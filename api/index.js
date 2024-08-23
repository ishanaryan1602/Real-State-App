import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import Authrouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();
await mongoose.connect(process.env.MONGO).then(() => console.log('connected to db')).catch((err) => console.log(err.message))
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/test', (req, res) => {
    res.send('Hello World');
});

app.use("/api/user",userRouter);
app.use("/api/auth",Authrouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});