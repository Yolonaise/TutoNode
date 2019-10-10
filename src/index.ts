import "reflect-metadata";
import Server from './server';
import DIContainer from './di.container';

const server: Server = DIContainer.resolve<Server>(Server);
server.configure();
server.start();
