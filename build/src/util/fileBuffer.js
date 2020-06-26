"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const utilities_1 = require("../util/utilities");
exports.default = multer_1.default({
    storage: multer_1.default.memoryStorage()
}).single(utilities_1.inputGame.image);
