"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const server = new server_1.default(parseInt(process.env.PORT, 10) || 8080);
server.configure();
server.start();
