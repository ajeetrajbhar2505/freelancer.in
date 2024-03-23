const express = require('express')
const app = express()
const cors = require('cors');
const dotenv = require('dotenv')
const http = require('http');
const socketIo = require('socket.io');
const chatSocket = require('./sockets/chatSocket');
app.use(express.json())
dotenv.config()
app.use(cors())

const server = http.createServer(app);
const io = socketIo(server);

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const roomRoutes = require('./routes/roomRoutes');

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/rooms', roomRoutes);

// Socket connection
io.on('connection', chatSocket);


const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  })
