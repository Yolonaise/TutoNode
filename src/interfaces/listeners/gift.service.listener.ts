
import { IGift } from "../../models/gift.model";

export interface IGiftListenner {
    onGiftCreated(gift: IGift): any;
    onGiftUpdated(oldGift: IGift, newGift: IGift): any;
    onGiftDeleted(giftId: string): any;
} 