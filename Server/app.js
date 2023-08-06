require("dotenv").config();
const clientHandler = require("./clientModule");
const moment = require("moment");
const express = require("express");
const app = express();
const http = require("http");
const port = process.env.PORT || 5000;
let server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.get("/", (req, res) => res.send("<h1>Hello World From Express</h1>"));

// main socket routine
io.on("connection", socket => {
    console.log("new connection established");
    socket.emit("roomlist", clientHandler.getRooms());
    // client has joined
    socket.on("join", client => {
        socket.name = client.chatName;
        socket.room = client.roomName;
        if (clientHandler.doesUserExist(socket.name)) {
            socket.name = undefined;
            socket.emit(
                "nameexists",
                `name already taken, try a different name`
            );
        } else {
            clientHandler.addUsers(socket.name,socket.room);
            clientHandler.addRoom(socket.room);

            socket.emit(`getusers`, clientHandler.getUsers(socket.room));

            // use the room property to create a room
            socket.join(socket.room);
            console.log(`${socket.name} has joined ${socket.room}`);
            // send message to joining client
            socket.emit(
                "welcome",
                {
                    time: moment().format("h:mm:ss a"),
                    text: `Welcome ${socket.name}`,
                    room: socket.room,
                    from: clientHandler.getAdminName(),
                    colour: clientHandler.getAdminColour()
                }
            );
            // send message to rest of the room the client just joined
            socket
                .to(socket.room)
                .emit("someonejoined", {
                    time: moment().format("h:mm:ss a"),
                    text: `${socket.name} has joined the ${socket.room} room!`,
                    room: socket.room,
                    from: clientHandler.getAdminName(),
                    colour: clientHandler.getAdminColour()
                });
        }

    });

    socket.on(`disconnect`, async () => {
        if (socket.name !== undefined) {
            clientHandler.removeUser(socket.name, socket.room);
            socket
                .to(socket.room)
                .emit(`getusers`, clientHandler.getUsers(socket.room));
            socket
                .to(socket.room)
                .emit("someoneleft", {
                    time: moment().format("h:mm:ss a"),
                    text: `${socket.name} has left the ${socket.room} room`,
                    room: socket.room,
                    from: clientHandler.getAdminName(),
                    colour: clientHandler.getAdminColour()
                });
        }

    });

    socket.on(`typing`, async clientData =>{
        socket.to(socket.room).emit(`someoneistyping`,{
            text: `${clientData.from} is typing...`
        })
    });

    socket.on('message', async clientData => {
        socket.emit('newmessage',{
            time: moment().format("h:mm:ss a"),
            text: clientData.text,
            room: socket.room,
            from: socket.name,
            colour: clientHandler.getUserColour(socket.name)
        });
        socket
            .to(socket.room)
            .emit(`newmessage`,{
                time: moment().format("h:mm:ss a"),
                room: socket.room,
                from: socket.name,
                text: clientData.text,
                colour: clientHandler.getUserColour(socket.name)
            })
    });

    socket.on(`onlineusers`, async ()=> {
        socket.emit(`getusers`, clientHandler.getUsers(socket.room));
    });

});

// will pass 404 to error handler
app.use((req, res, next) => {
    const error = new Error("No such route found");``
    error.status = 404;
    next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error"
        }
    });
});

server.listen(port, () => console.log(`starting on port ${port}`));