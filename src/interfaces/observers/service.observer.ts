import { injectable } from "inversify";

@injectable()
export class Observer<T> {
    protected listeners: T[] = [];

    constructor(listeners: T[]) {
        this.listeners = listeners;
    }
}