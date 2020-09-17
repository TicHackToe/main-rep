"use strict";

const app = require("express")(); // currying function
const http = require("http").createServer(app);
const io = require("socket.io")(http); // currying function
const socket = require('./config/socket')

socket.start(io)

http.listen(3000, () => {
	console.log("listening on *:3000");
});