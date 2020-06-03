import mongoose, { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';


export interface User extends mongoose.Document {

    encryptPassword(upass: string): Promise<string>;
    comparePassword(upass: string): Promise<boolean>;
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

UserSchema.methods.encryptPassword = async (upass:string) : Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(upass, salt);
};
UserSchema.methods.comparePassword = async function (upass:string): Promise<boolean> {
    return bcrypt.compare(upass, this.upass);
};

export default model<User>('User', UserSchema);




