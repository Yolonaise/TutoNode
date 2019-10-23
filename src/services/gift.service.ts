import { injectable, multiInject, inject } from "inversify";
import Gift, { IGift } from "../models/gift.model";
import { Observer } from "../interfaces/observers/service.observer";
import { IGiftListenner } from "../interfaces/listeners/gift.service.listener";
import GameUserGiftService from "./game-user-gift.service";

@injectable()
export default class GiftService extends Observer<IGiftListenner>{

    constructor(
        @inject(GameUserGiftService) private gameUserGiftService: GameUserGiftService,
        @multiInject("IGiftListener") listeners: IGiftListenner[]) {
        super(listeners);
    }

    async getGift(giftId: string) {
        return await Gift.findById(giftId);
    }

    async createGift(gift: IGift) {
        let result = await new Gift(gift).save();
        this.listeners.forEach(l => { l.onGiftCreated(result as IGift); });

        return result;
    }

    async updateGift(giftId: string, gift: IGift) {
        let result = await Gift.findByIdAndUpdate(giftId, { gift }, { new: true });
        this.listeners.forEach(l => { l.onGiftUpdated(gift, result as IGift); });

        return result;
    }

    async deleteGift(giftId: string) {
        await Gift.findByIdAndDelete(giftId);
        this.listeners.forEach(l => { l.onGiftDeleted(giftId); });
    }
}