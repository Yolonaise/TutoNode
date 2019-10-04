import Server from './server';

const port = parseInt(<string>process.env.PORT, 10) || 4201;
const server = new Server(port);

server.configure();
server.start();