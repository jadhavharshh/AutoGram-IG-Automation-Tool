import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

let app = express();
dotenv.config()

const port = process.env.PORT || 50000

// Middleware for CORS
app.use(cors({
    origin: [process.env.ORIGIN as string],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true
}));

app.use(cookieParser())
app.use(express.json())


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res)=>{
    res.send('Hello')
});