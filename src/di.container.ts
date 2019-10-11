import "reflect-metadata";
import { Container } from 'inversify';
import ApiController from './controllers/api.controller';
import MainController from './controllers/main.controller';
import UserController from './controllers/user.controller';
import ApiRoute from './routes/api.route';
import UserRoute from './routes/user.route';
import MainRoute from './routes/main.route';
import IController from './interfaces/controller.interface';
import ICrud from './interfaces/crud.interface';
import GiftRoute from './routes/gift.route';
import GiftController from './controllers/gift.controller';

var DIContainer = new Container();

DIContainer.bind<IController>(MainController).toSelf();
DIContainer.bind<ICrud>(ApiController).toSelf();
DIContainer.bind<ICrud>(UserController).toSelf();
DIContainer.bind<ICrud>(GiftController).toSelf();

DIContainer.bind<MainRoute>("IRoute<IController>").to(MainRoute);
DIContainer.bind<ApiRoute>("IRoute<IController>").to(ApiRoute);
DIContainer.bind<UserRoute>("IRoute<IController>").to(UserRoute);
DIContainer.bind<GiftRoute>("IRoute<IController>").to(GiftRoute);

export default DIContainer;