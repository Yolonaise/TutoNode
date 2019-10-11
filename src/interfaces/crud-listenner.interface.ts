
export interface ICrudListenner {
    onGet(): void;
    onCreate(): void;
    onDelete(): void;
    onUpdate(): void;
}

export interface ICrudObserver {
    listenners: ICrudListenner[];

    notifyGet(): void;
    notifyCreate(): void;
    notifyDelete(): void;
    notifyUpdate(): void;
}