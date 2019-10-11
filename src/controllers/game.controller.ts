import ICrud from "../interfaces/crud.interface";
import express from "express";

export default class GameController implements ICrud {
    get(req: express.Request, res: express.Response) {
        throw new Error("Method not implemented.");
    }

    create(req: express.Request, res: express.Response) {
        throw new Error("Method not implemented.");
    }

    update(req: express.Request, res: express.Response) {
        throw new Error("Method not implemented.");
    }

    delete(req: express.Request, res: express.Response) {
        throw new Error("Method not implemented.");
    }


}