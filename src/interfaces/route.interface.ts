import express from 'express';
import IController from './controller.interface';

export interface IRoute<IController> {
    endpoint: string;
    controller: IController;

    configure(): express.Router;
} 