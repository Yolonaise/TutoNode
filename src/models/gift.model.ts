import { Schema, Document, model } from 'mongoose';

export interface IGift extends Document {
    name?: string,
    link?: string,
    userId?: string;
};

const giftSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    link: { type: String, required: false },
    userId: { type: String, required: true }
});

// Export the model
const Gift = model<IGift>('gift',giftSchema);
export default Gift;