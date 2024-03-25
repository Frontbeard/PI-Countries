const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(router); // ayuda a pegar la API //

module.exports = server;

// orden en el que se ejecutan las cosas del servidor //