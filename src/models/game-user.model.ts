import { Schema, Document, model } from 'mongoose';

export interface IGameUser extends Document {
    gameid: string,
    userid: string
};

const GameUserSchema = new Schema({
    gameid: { type: String, required: true },
    userid: { type: String, required: true }
});

// Export the model
const GameUser = model<IGameUser>('gameUser', GameUserSchema);
export default GameUser;