import { injectable } from "inversify";
import Gift, { IGift } from "../models/gift.model";

@injectable()
export default class GiftService {

    async getGift(giftId: string) {
        return await Gift.findById(giftId);
    }

    async createGift(gift: IGift) {
        return await new Gift(gift).save();
    }

    async updateGift(giftId: string, gift: IGift) {
        return await Gift.findByIdAndUpdate(giftId, { gift }, { new: true });
    }

    async deleteGift(giftId: string) {
        return await Gift.findByIdAndDelete(giftId);
    }
}