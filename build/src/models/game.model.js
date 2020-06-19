"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GameSchema = new mongoose_1.Schema({
    gname: { type: String, required: true },
    gdescription: { type: String, required: true },
    ggender: { type: String, required: true },
    gconsole: { type: String, required: true },
    grequirements: { type: String, required: true },
    gauthor: String,
    gimage: String,
    uid: { type: String, required: true }
});
exports.default = mongoose_1.model('Game', GameSchema);
