import { Request, Response } from "express";

export default class MainController {
    constructor() { }

    getStatus(req: Request, res: Response) {
        return res.send({ statusCode: 200, message: "Server is online" });
    }
}