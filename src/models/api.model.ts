import { Schema, Document, model } from 'mongoose';

export interface IApi extends Document {
    key?: string;
    applicationName?: string;
    userId?: string;
};

const apiSchema = new Schema({
    key: { type: String, required: true, max: 100 },
    applicationName: { type: String, required: true, max: 250 },
    email: { type: String, required: true }
});

// Export the model
const Api = model<IApi>('apiKey', apiSchema);
export default Api;