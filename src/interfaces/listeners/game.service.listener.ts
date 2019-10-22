
import { IGame } from "../../models/game.model";

export interface IGameListenner {
    onGameCreated(game: IGame): any;
    onGameUpdated(oldGame: IGame, newGame: IGame): any;
    onGameDeleted(gameId: string): any;
} 