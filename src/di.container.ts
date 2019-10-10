import { Container } from 'inversify';
import ApiController from './controllers/api.controller';
import MainController from './controllers/main.controller';
import UserController from './controllers/user.controller';
import ApiRoute from './routes/api.route';
import UserRoute from './routes/user.route';
import MainRoute from './routes/main.route';
import IController from './interfaces/controller.interface';
import ICrud from './interfaces/crud.interface';
import { IRoute } from './interfaces/route.interface';

import "reflect-metadata";

var DIContainer = new Container();

DIContainer.bind<IController>(MainController).toSelf();
DIContainer.bind<ICrud>(ApiController).toSelf();
DIContainer.bind<ICrud>(UserController).toSelf();

DIContainer.bind<MainRoute>("IRoute<IController>").to(MainRoute);
DIContainer.bind<ApiRoute>("IRoute<IController>").to(ApiRoute);
DIContainer.bind<UserRoute>("IRoute<IController>").to(UserRoute);

export default DIContainer;