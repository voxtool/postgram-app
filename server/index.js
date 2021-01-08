global.__basedir = __dirname;
const config = require('./config/config');
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const apiRouter = require('./router');
const cors = require('cors');
const { errorHandler } = require('./utils');
const { Room } = require('./models');


(async function () {
    try {
        await mongoose.connect(config.dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Database is up and running...');

        const app = express();
        app.use(express.json());
        app.use(cookieParser(config.cookieSecret));
        app.use(express.static(path.resolve(__basedir, 'static')));
        app.use(cors({
            origin: config.origin,
            credentials: true
        }));
        app.use('/api', apiRouter);
        app.use(errorHandler);
        app.get('/', (req, res, next) => {
            res.status(200).send(path.resolve(__basedir, 'static', 'index.html'));
        });
        const server = http.createServer(app);
        const io = socket(server, {
            cors: {
                origin: '*',
            }
        });

        io.on('connection', (socket) => {
            socket.on('join', async ({ sender, receiver }) => {
                let room = await Room.findOne({ people: { $all: [sender, receiver] } });
                if (!room) {
                    const string = sender + receiver;
                    room = await Room.create({ name: string, people: [sender, receiver], messages: [] });
                }

                socket.leaveAll();
                socket.join(room.name);
                io.in(room.name).emit('join', room.messages.slice(-10));
            });

            socket.on('chat', async ({ message, receiver, sender }) => {
                const room = await Room.findOne({ people: { $all: [sender, receiver] } });
                await Room.updateOne({ _id: room._id }, { $addToSet: { messages: { sender, message } } }, { new: true });
                io.in(room.name).emit('chat', { sender, message });
            });

            socket.on('disconnect', () => {
                console.log('socket disconnected: ' + socket.id);
            });
        });

        server.listen(config.port, console.log(`Listening on port ${config.port}...`));
    } catch (error) {
        console.error(error);
    };
})();