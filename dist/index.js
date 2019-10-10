"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = __importDefault(require("./server"));
const di_container_1 = __importDefault(require("./di.container"));
const server = di_container_1.default.resolve(server_1.default);
server.configure();
server.start();
