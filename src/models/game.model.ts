import mongoose, { model, Schema } from 'mongoose';

export interface Game extends mongoose.Document {
    gname: string;
    gdescription: string;
    gimage: string;
    ggender: string;
    gconsole: string;
    grequirements: string;
    gauthor: string
}

const GameSchema = new Schema({
    gname: { type: String, required: true },
    gdescription: { type: String, required: true },
    ggender: { type: String, required: true },
    gconsole: { type: String, required: true },
    grequirements: { type: String, required: true },
    gauthor: String,
    gurlimage: String
});

export default model<Game>('Game', GameSchema);