import { Schema, Document, model } from 'mongoose';

export interface IGame extends Document {
    name?: string;
    admin?: string;
    price?: number;
};

const gameSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    admin: { type: String, required: true, max: 250 },
    price: { type: Number, required: true }
});

// Export the model
const Game = model<IGame>('game', gameSchema);
export default Game;