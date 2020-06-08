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
const game_model_1 = __importDefault(require("../models/game.model"));
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users = require('../models/user.model');
const express_validator_1 = require("express-validator");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
    }
    //Login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = express_validator_1.validationResult(req);
                if (error.isEmpty()) {
                    const { uemail, upass } = req.body;
                    yield user_model_1.default.findOne({ uemail: { $regex: uemail } })
                        .then((user) => __awaiter(this, void 0, void 0, function* () {
                        if (user) {
                            const equals = yield user.comparePassword(upass);
                            console.log(equals);
                            if (equals) {
                                const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.env.mysecret, {
                                    expiresIn: config_1.env.expiresIn
                                });
                                res.json({ auth: true, token });
                            }
                            else {
                                res.json({
                                    auth: false,
                                    msg: 'El correo o el usuario es incorrecto'
                                });
                            }
                        }
                        else {
                            res.json({ auth: false, msg: 'usuario no encontrado' });
                        }
                    }));
                }
                else {
                    res.json({
                        error: 'Correo o clave no son validos'
                    });
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).send('There was a problem registering your user');
            }
        });
    }
    //Register
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = express_validator_1.validationResult(req);
                if (error.isEmpty()) {
                    const { uname, uemail, upass, uage } = req.body;
                    const user = new user_model_1.default({
                        uname,
                        uemail,
                        upass,
                        uage
                    });
                    user.upass = yield user.encryptPassword(upass);
                    const us = yield user.save();
                    const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.env.mysecret, {
                        expiresIn: config_1.env.expiresIn
                    });
                    res.json({ auth: true, token });
                }
                else {
                    res.json({ errorRegex: error });
                }
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
    //getUser
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.default.find();
            res.json({
                users
            });
        });
    }
    //Update user
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_model_1.default.findByIdAndUpdate(req.body.uid, req.body);
                res.json({
                    message: "Usuario actualizado con éxito"
                });
            }
            catch (error) {
                res.json({
                    messagerror: error
                });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findByIdAndDelete(req.body.uid);
                if (user) {
                    yield game_model_1.default.deleteMany({ uid: { $regex: user._id } });
                }
                res.json({
                    message: "Este usuario fue eliminado con éxito",
                });
            }
            catch (error) {
                res.json({
                    messagerror: error,
                });
            }
        });
    }
}
const userRouter = new UserRouter();
exports.default = userRouter;
