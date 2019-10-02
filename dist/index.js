"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const port = parseInt(process.env.PORT, 10) || 8080;
console.log(port);
const server = new server_1.default(port);
server.configure();
server.start();
