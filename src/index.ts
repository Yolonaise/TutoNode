import Server from './server';

const port = parseInt(<string>process.env.PORT, 10) || 8080;
console.log(port)
const server = new Server(port);

server.configure();
server.start();