import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    name?: string;
    email?: string;
    isRegistered?: boolean;
};

const userSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 250 },
    isRegistered: { type: Boolean, required: true, default: false }
});

// Export the model
const User = model<IUser>('user', userSchema);
export default User;