import { Schema, Document, model } from 'mongoose';

export interface IGift extends Document {
    name?: string,
    link?: string
};

const giftSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    link: { type: String, required: false }
});

// Export the model
const Gift = model<IGift>('gift', giftSchema);
export default Gift;