"use strict";

const app = require("express")(); // currying function
const http = require("http").createServer(app);
const io = require("socket.io")(http); // currying function
const socket = require('./config/socket')

const PORT = process.env.PORT || 3000

socket.start(io)

http.listen(PORT, () => {
	console.log("listening on *:3000");
});