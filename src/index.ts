import Server from './server';

const server = new Server(8080);

server.configure();
server.start();