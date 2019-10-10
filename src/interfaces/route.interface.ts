import express from 'express';

export interface IRoute<IController> {
    endpoint: string;

    getController(): IController;
    configure(): express.Router;
} 