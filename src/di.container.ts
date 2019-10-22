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
import GameRoute from "./routes/game.route";
import GameController from "./controllers/game.controller";
import UserService from "./services/user.service";
import GameService from "./services/game.service";
import GiftService from "./services/gift.service";

var DIContainer = new Container();

DIContainer.bind<IController>(MainController).toSelf();
DIContainer.bind<ICrud>(ApiController).toSelf();
DIContainer.bind<ICrud>(UserController).toSelf();
DIContainer.bind<ICrud>(GiftController).toSelf();
DIContainer.bind<ICrud>(GameController).toSelf();

DIContainer.bind<MainRoute>("IRoute<IController>").to(MainRoute);
DIContainer.bind<ApiRoute>("IRoute<IController>").to(ApiRoute);
DIContainer.bind<UserRoute>("IRoute<IController>").to(UserRoute);
DIContainer.bind<GiftRoute>("IRoute<IController>").to(GiftRoute);
DIContainer.bind<GameRoute>("IRoute<IController>").to(GameRoute);

DIContainer.bind<UserService>(UserService).toSelf();
DIContainer.bind<GameService>(GameService).toSelf();
DIContainer.bind<GiftService>(GiftService).toSelf();

export default DIContainer;