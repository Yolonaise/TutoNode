import { injectable } from "inversify";

@injectable()
export class Observer<T> {
    protected listeners: T[] = [];
    
    register(listener: T){
        if(!listener)
            return;
        
        this.listeners.push(listener);
    }
}