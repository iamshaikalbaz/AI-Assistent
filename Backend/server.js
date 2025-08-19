import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import cors from 'cors'
import userRouter from './routes/user.js';



const app = express();
const port = process.env.PORT || 3000

app.use(cors({
    origin: "https://ai-assistant-60a0.onrender.com",
    credentials: true
}))
app.use(express.json()); // ✅ parse JSON body
app.use(express.urlencoded({ extended: true })); // optional
app.use(cookieParser());
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)



app.listen(port, function(){
    connectDB()
    console.log("Its Running Bro");
});
 