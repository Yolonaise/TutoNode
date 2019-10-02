import Server from './server';

const server = new Server(parseInt(<string>process.env.PORT, 10) || 8080);

server.configure();
server.start();