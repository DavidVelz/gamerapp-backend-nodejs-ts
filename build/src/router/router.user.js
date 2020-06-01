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
const express_1 = require("express");
const user_model_1 = __importDefault(require("../models/user.model"));
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user = require('../models/user.model');
class UserRouter {
    constructor() {
        this.router = express_1.Router();
    }
    //Login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Register
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uname, uemail, upass, uage } = req.body;
                const user = new user_model_1.default({
                    uname,
                    uemail,
                    upass,
                    uage
                });
                user.upass = yield user.encryptPassword(upass);
                const us = yield user.save();
                const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.secret.secret, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });
                res.json({ auth: true, token });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('There was a problem registering your user');
            }
        });
    }
    //getUser
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(req.params.id);
            res.json({
                user
            });
        });
    }
}
const userRouter = new UserRouter();
exports.default = userRouter;
