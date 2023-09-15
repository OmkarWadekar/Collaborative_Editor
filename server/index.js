import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import jwt from 'jsonwebtoken';
import { getDocument, updateDocument } from './controller/document-controller.js';
import Connection from './database/db.js';
import bodyParser from 'body-parser';
import userRoutes from './user_routes.js';
import cors from 'cors';

const PORT = process.env.PORT || 9000;
const SECRET_KEY = 'JSONWebtoken'; // Replace with a secure secret key

Connection();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// // Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
};




io.on('connection', socket => {
    console.log("connected");

    // Use authenticateToken middleware to protect routes that require authentication
    // socket.on('get-document', authenticateToken, async documentId => {
    socket.on('get-document', async documentId => {
        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        socket.on('save-document', async data => {
            await updateDocument(documentId, data);
        });
    });
});

// console.log("just before userRoute");
// app.use('/api/users', userRoutes);
app.use(userRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
