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
const uploadFiles_1 = __importDefault(require("../util/uploadFiles"));
class GameRouter {
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
    //getGame for id
    getGamesUid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield game_model_1.default.find({ uid: { $regex: req.body.uid } });
            res.json({
                games
            });
        });
    }
    //CreateGame
    createGame(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield uploadFiles_1.default(req, res, () => __awaiter(this, void 0, void 0, function* () {
                    const { gname, gdescription, ggender, gconsole, grequirements, gauthor, uid = '5ee2ea70bf6b0a17d851835d', } = req.body;
                    const gimage = `/uploads/${req.file.originalname}`;
                    console.log(gimage);
                    console.log(uid);
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
                    console.log();
                    res.json({
                        game: db
                    });
                }));
            }
            catch (error) {
                res.json({ error: error });
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
const gamesRouter = new GameRouter();
exports.default = gamesRouter;
