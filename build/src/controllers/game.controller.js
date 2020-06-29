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
const game_model_1 = __importDefault(require("../models/game.model"));
const fileBuffer_1 = __importDefault(require("../util/fileBuffer"));
const file_type_1 = __importDefault(require("file-type"));
const utilities_1 = require("../util/utilities");
const config_1 = require("../config/config");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class GameController {
    constructor() {
        this.router = express_1.Router();
    }
    //Devolver todos los juegos
    getGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield game_model_1.default.find();
                res.json({
                    games
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error obteniendo todos los juegos');
            }
        });
    }
    //Devolver un juego
    getGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield game_model_1.default.findById(req.body.gid);
                res.json({
                    game
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error obteniendo el juego');
            }
        });
    }
    //Juegos por usuario
    getGamesUid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield game_model_1.default.find({ uid: { $regex: req.body.uid } });
                res.json({
                    games
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error obteniendo juegos para este usuario');
            }
        });
    }
    //Validar content-type de la imagen y subirla al servidor
    validateFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fileBuffer_1.default(req, res, () => __awaiter(this, void 0, void 0, function* () {
                    const bufferFile = yield file_type_1.default.fromBuffer(req.file.buffer);
                    let contentType = [utilities_1.extImage.jpeg, utilities_1.extImage.png, utilities_1.extImage.jpg];
                    let isEquals = false;
                    contentType.forEach((type) => {
                        if (type === (bufferFile === null || bufferFile === void 0 ? void 0 : bufferFile.mime)) {
                            isEquals = true;
                            return;
                        }
                    });
                    if (isEquals) {
                        yield fs_1.promises.writeFile(path_1.default.join(process.cwd(), 'uploads', req.file.originalname), req.file.buffer);
                    }
                    else {
                        return res.status(415).send('El formato del archivo no es valido');
                    }
                    next();
                }));
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Problemas validando la el archivo');
            }
        });
    }
    //Crear juego
    createGame(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gname, gdescription, ggender, gconsole, grequirements, gauthor, uid } = req.body;
                const gimage = `/${config_1.env.desUpload}/${req.file.originalname}`;
                const game = new game_model_1.default({
                    gname,
                    gdescription,
                    ggender,
                    gconsole,
                    grequirements,
                    gauthor,
                    gimage,
                    uid
                });
                const db = yield game.save();
                res.json({
                    game: db
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error registrando el juego');
            }
        });
    }
    //Eliminar juego por id
    deleteGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield game_model_1.default.findByIdAndDelete(req.body.gid);
                res.json({
                    message: "Este juego fue eliminado con éxito",
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error eliminando el juego');
            }
        });
    }
    //Actualizar juego
    updateGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield game_model_1.default.findByIdAndUpdate(req.body.gid, req.body, { new: true });
                res.json({
                    game
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error actualizando el juego');
            }
        });
    }
}
const gameController = new GameController();
exports.default = gameController;
