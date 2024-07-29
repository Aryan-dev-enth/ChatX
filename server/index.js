import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDb from './db/connect.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { notFound, errorFoundHandler } from './middlewares/errorMiddleware.js';


import { Server } from 'socket.io';

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ChatX API is live!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorFoundHandler);

// Initialize Socket.IO server
const io = new Server({
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
});

// Connect to MongoDB
const port = process.env.PORT || 8001;
const mongo_uri = process.env.MONGO_URI;
const db_name = process.env.DB_NAME;
await connectDb(mongo_uri, db_name);

// Start Express server and attach Socket.IO server to the same port
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Attach Socket.IO to the HTTP server
io.attach(server);

io.on("connection", (socket) => {
    console.log("Connected to socket");

    socket.on('setup', (userData)=>{
        socket.join(userData._id);
        socket.emit('connected');
        
    })

    
    socket.on("join chat", (room) => {
        socket.join(room);
    });

    socket.on('typing', (room)=>{
        socket.in(room).emit('typing');
    });
    socket.on('stop typing', (room)=>{
        socket.in(room).emit('stop typing');
    });

    socket.on('new message',(newMessageReceived)=>{
        var chat = newMessageReceived.chat;
        if(!chat.users){
            return console.log("chat.users not defined");
        }

        chat.users.forEach(user=>{
            if(user._id == newMessageReceived.sender._id){
                return;
            }
            socket.in(user._id).emit('message received',newMessageReceived);
        })
    });
    socket.off('setup', ()=>{
        socket.leave(userData._id)
    })
    
   
});
