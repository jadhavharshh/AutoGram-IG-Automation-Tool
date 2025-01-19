import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoute';
import mongoose from 'mongoose';
import IGRoutes from './routes/IGRoutes';

let app = express();
dotenv.config()

const port = process.env.PORT || 50000
const DATABASE_URL = process.env.DATABASE_URL;

// Middleware for CORS
app.use(cors({
    origin: process.env.ORIGIN as string,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true
}));

app.use(cookieParser())
app.use(express.json())


app.use("/api/auth", authRoutes);
app.use("/api/ig/v1", IGRoutes);
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res)=>{
    res.send('Hello')
});

mongoose.connect(DATABASE_URL as string).then(()=>{
    console.log('Database connected')
})