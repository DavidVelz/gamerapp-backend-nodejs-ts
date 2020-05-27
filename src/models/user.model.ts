import mongoose, { model, Schema } from 'mongoose';

export interface User extends mongoose.Document {
    uname: string;
    uemail: string;
    upass: string;
    uage: number
}

const UserSchema = new Schema({
    uname: { type: String, required: true },
    uemail: { type: String, required: true, unique:true },
    upass: { type: String, required: true },
    uage: Number,
});

export default model<User>('User', UserSchema);


