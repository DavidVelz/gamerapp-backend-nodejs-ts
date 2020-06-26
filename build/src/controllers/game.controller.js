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
const express_validator_1 = require("express-validator");
class GameController {
    constructor() {
        this.router = express_1.Router();
    }
    //getGames
    getGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield game_model_1.default.find();
            res.json({
                games
            });
        });
    }
    getGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield game_model_1.default.findById(req.body.gid);
            res.json({
                game
            });
        });
    }
    //getGame for id
    getGamesUid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield game_model_1.default.find({ uid: { $regex: req.body.uid } });
            res.json({
                games
            });
        });
    }
    validateFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = express_validator_1.validationResult(req);
                if (error.isEmpty()) {
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
                            return res.status(500).send('El formato del archivo no es valido');
                        }
                        next();
                    }));
                }
                else {
                    console.log(error);
                    res.json({ errorInput: error });
                }
            }
            catch (e) {
                console.log(e);
                res.json({ errorValidate: e });
            }
        });
    }
    //CreateGame
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
            catch (error) {
                //Eliminar la imagen en caso de errores
                res.json({ errorDb: error });
            }
        });
    }
    //deleteGame for id
    deleteGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield game_model_1.default.findByIdAndDelete(req.body.gid);
                res.json({
                    message: "Este juego fue eliminado con éxito",
                });
            }
            catch (error) {
                res.json({
                    messagerror: error,
                });
            }
        });
    }
    //updateGame for id
    updateGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield game_model_1.default.findByIdAndUpdate(req.body.gid, req.body);
                res.json({
                    message: "Este juego fue actualizado con éxito"
                });
            }
            catch (error) {
                res.json({
                    messagerror: error
                });
            }
        });
    }
}
const gameController = new GameController();
exports.default = gameController;
