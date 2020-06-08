"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
function checkToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenString = req.headers.authorization;
            const token = tokenString.split(" ")[1];
            if (!token) {
                return res.status(401).send({ auth: false, message: 'No token provided' });
            }
            // Decodificar el token para obtener el id de usuario
            const decoded = yield jsonwebtoken_1.default.verify(token, config_1.env.mysecret);
            req.body.uid = decoded.id;
            next();
        }
        catch (e) {
            console.log(e);
            res.status(500).send('There was a problem registering your user');
        }
    });
}
exports.default = checkToken;
