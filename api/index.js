import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import Authrouter from './routes/auth.route.js';
dotenv.config();
mongoose.connect(process.env.MONGO).then(() => console.log('connected to db')).catch((err) => console.log(err.message))
const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
    res.send('Hello World');
});

app.use("/api/user",userRouter);
app.use("/api/auth",Authrouter);

app.listen(3000, () => {
    console.log('listening on port 3000');
});