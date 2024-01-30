const express = require("express");
const routerr = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(routerr);


module.exports = server;




// esta carpeta es el servidor!*    