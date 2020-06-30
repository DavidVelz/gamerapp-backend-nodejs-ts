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
const user_model_1 = __importDefault(require("../models/user.model"));
const game_model_1 = __importDefault(require("../models/game.model"));
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
class UserController {
    //Iniciar sesión y generar token
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
                            res.json({ auth: false, msg: 'Usuario no encontrado' });
                        }
                    }))
                        .catch((e) => {
                        console.log(e);
                        res.status(500).send('Error obeniendo el usuario');
                    });
                }
                else {
                    res.json({
                        errorRegex: error
                    });
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Problemas autenticando este usuario');
            }
        });
    }
    //Registrar usuario y generar token
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
                res.status(500).send('Problemas registrando el usuario');
            }
        });
    }
    //Información del usuario
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(req.body.uid);
                res.json({
                    user
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error obteniendo el usuario');
            }
        });
    }
    //Ver todos usuarios (nombre, email)
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listUsers = yield user_model_1.default.find();
                let users = [];
                for (let x of listUsers) {
                    const user = {
                        uname: x.uname,
                        uemail: x.uemail
                    };
                    users.push(user);
                }
                res.json({ users });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error obteniendo los usuarios');
            }
        });
    }
    //Actualizar usuario
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.body.uid;
                const { uname, uemail, upass, uage } = req.body;
                let userUpdate = new user_model_1.default({
                    _id,
                    uname,
                    uemail,
                    upass,
                    uage
                });
                userUpdate.upass = yield userUpdate.encryptPassword(req.body.upass);
                const userUp = yield user_model_1.default.findByIdAndUpdate(req.body.uid, userUpdate, { new: true });
                res.json({
                    message: "Usuario actualizado con éxito",
                    user: userUp
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error actualizando el usuario');
            }
        });
    }
    //Eliminar usuario (tambien se eliminan sus juegos)
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
            catch (e) {
                console.log(e);
                res.status(500).send('Error eliminando el usuario');
            }
        });
    }
    //Eliminar Todos los usuarios
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_model_1.default.deleteMany({});
                res.json({
                    message: "Usuarios eliminados con éxito",
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error eliminando los usuarios');
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
