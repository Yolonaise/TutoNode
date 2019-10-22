import { Schema, Document, model } from 'mongoose';

export interface IGameUserGift extends Document {
    gameid: string,
    userid: string,
    giftid: string,
};

const GameUserGiftSchema = new Schema({
    gameid: { type: String, required: true },
    userid: { type: String, required: true },
    giftid: { type: String, required: true }
});

// Export the model
const GameUserGift = model<IGameUserGift>('gameUser', GameUserGiftSchema);
export default GameUserGift;