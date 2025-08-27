import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors'
import { connectDB } from './db/connectDB.js';

import userRouters from './routers/user.router.js'
import postRouters from './routers/post.router.js'
import likesRouters from './routers/likes.router.js'



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL

app.use(cors({ origin: URL, credentials: true, allowedHeaders: ["Authorization", "Content-Type"], }))
app.use(express.json()); // allow parse incoming request: req.body
app.use(cookieParser()) // allow parse incoming cookie 
app.use(express.static('uploads'))

app.get('/', (req, res) => {
  res.send('This is backend route without authentication')
})

app.get('/testing', (req, res) => {
  res.send('This is Testing URL at backend route without authentication')
})

app.use("/api/user", userRouters);
app.use("/api/posts", postRouters);
app.use("/api/likes", likesRouters);


app.listen(PORT, () => {
  connectDB();
  console.log("server is running on:", PORT);
})
