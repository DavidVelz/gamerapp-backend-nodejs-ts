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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const config = require('../config');
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided' });
        }
        // Decode the Tokenreq.userId = decoded.id;
        const decoded = yield jwt.verify(token, config.secret);
        req.body.uid = decoded.id;
        next();
    });
}
exports.default = verifyToken;
