"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const buffer_file_1 = __importDefault(require("../storage/buffer.file"));
const file_type_1 = __importDefault(require("file-type"));
const utilities_1 = require("../util/utilities");
const config_1 = require("../config/config");
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const del_1 = __importDefault(require("del"));
const handler_file_1 = __importDefault(require("../storage/handler.file"));
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
                    msg: "Bienvenid@s a GamersApp",
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
    //Validar número mágico de la imagen y subirla al servidor
    validateFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield buffer_file_1.default(req, res, () => __awaiter(this, void 0, void 0, function* () {
                    const gid = req.body.gid;
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
                        if (gid === undefined) {
                            const exist = handler_file_1.default.checkPath(path_1.default.join(process.cwd(), 'uploads'));
                            if (exist) {
                                console.log(exist);
                                yield fs_1.promises.writeFile(path_1.default.join(process.cwd(), 'uploads', req.file.originalname), req.file.buffer);
                            }
                            else {
                                yield fs_1.default.mkdirSync(path_1.default.join(process.cwd(), 'uploads'));
                                fs_1.promises.writeFile(path_1.default.join(process.cwd(), 'uploads', req.file.originalname), req.file.buffer);
                            }
                        }
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
                const newGame = yield game.save();
                res.json({
                    game: newGame
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
                const currentGame = yield game_model_1.default.findById(req.body.gid);
                yield game_model_1.default.findByIdAndDelete(req.body.gid);
                if ((currentGame === null || currentGame === void 0 ? void 0 : currentGame.gimage) !== undefined) {
                    if (fs_1.default.existsSync(path_1.default.join(process.cwd(), currentGame === null || currentGame === void 0 ? void 0 : currentGame.gimage))) {
                        yield fs_1.promises.unlink(path_1.default.join(process.cwd(), currentGame === null || currentGame === void 0 ? void 0 : currentGame.gimage));
                    }
                    else {
                        res.json({
                            message: "El archivo del juego no existe",
                        });
                    }
                }
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
                const _id = req.body.gid;
                const { gname, gdescription, ggender, gconsole, grequirements, gauthor, uid } = req.body;
                let urlImage = null;
                const currentGame = yield game_model_1.default.findById(_id);
                urlImage = `/${config_1.env.desUpload}/${req.file.originalname}`;
                if (urlImage !== (currentGame === null || currentGame === void 0 ? void 0 : currentGame.gimage)
                    && (currentGame === null || currentGame === void 0 ? void 0 : currentGame.gimage) !== undefined) {
                    if (fs_1.default.existsSync(path_1.default.join(process.cwd(), currentGame === null || currentGame === void 0 ? void 0 : currentGame.gimage))) {
                        yield fs_1.promises.unlink(path_1.default.join(process.cwd(), currentGame === null || currentGame === void 0 ? void 0 : currentGame.gimage));
                        fs_1.promises.writeFile(path_1.default.join(process.cwd(), 'uploads', req.file.originalname), req.file.buffer);
                    }
                    else {
                        fs_1.promises.writeFile(path_1.default.join(process.cwd(), 'uploads', req.file.originalname), req.file.buffer);
                    }
                }
                const newGame = new game_model_1.default({
                    _id,
                    gname,
                    gdescription,
                    ggender,
                    gconsole,
                    grequirements,
                    gauthor,
                    gimage: urlImage,
                    uid
                });
                const game = yield game_model_1.default.findByIdAndUpdate(req.body.gid, newGame, { new: true });
                res.json({
                    message: "Juego actualizado con éxito",
                    user: game
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error actualizando el juego');
            }
        });
    }
    //Eliminar Todos los juegos
    deleteGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield game_model_1.default.deleteMany({});
                const urlPath = path_1.default.join(process.cwd(), 'uploads');
                if (fs_1.default.existsSync(urlPath)) {
                    yield del_1.default(urlPath);
                }
                res.json({
                    message: "Juegos eliminados con éxito",
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send('Error eliminando los juegos');
            }
        });
    }
}
const gameController = new GameController();
exports.default = gameController;
