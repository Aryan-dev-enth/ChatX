import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
const app = express();
import connectDb from './db/connect.js';
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import {notFound, errorFoundHandler} from './middlewares/errorMiddleware.js';


const port= process.env.PORT || 8001 ;
const mongo_uri=  process.env.MONGO_URI;
const db_name= process.env.DB_NAME;

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("ChatX API is live!")
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorFoundHandler);


await connectDb(mongo_uri, db_name);
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
})