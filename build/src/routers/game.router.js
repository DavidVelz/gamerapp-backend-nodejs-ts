"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_controller_1 = __importDefault(require("../controllers/game.controller"));
const checkToken_1 = __importDefault(require("../authentication/checkToken"));
const express_validator_1 = require("express-validator");
const utilities_1 = require("../util/utilities");
class GameRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Nuevo Juego 
        this.router.get(utilities_1.Routers.gamecreate, 
        /*body(inputGame.name)
            .exists()
            .notEmpty()
            .withMessage('El paramatro nombre del juego es requerido')
            .matches(regexField.gname, "i")
            .withMessage('El Nombre del juego no es valido')
            .trim()
            .escape(),
        body(inputGame.description)
            .exists()
            .notEmpty()
            .withMessage('El paramatro descripción es requerido')
            .matches(regexField.gdescription, "i")
            .withMessage('La descripción no es valido')
            .trim()
            .escape(),
        body(inputGame.gender)
            .exists()
            .notEmpty()
            .withMessage('El paramatro genero es requerido')
            .matches(regexField.ggender, "i")
            .withMessage('El genero no es valido')
            .trim()
            .escape(),
            body(inputGame.console)
            .exists()
            .notEmpty()
            .withMessage('El paramatro consola es requerido')
            .matches(regexField.gconsole, "i")
            .withMessage('La consola no es valida')
            .trim()
            .escape(),
            body(inputGame.requirements)
            .exists()
            .notEmpty()
            .withMessage('El paramatro requerimientos es requerido')
            .matches(regexField.grequirements, "i")
            .withMessage('Los requirements no son validos')
            .trim()
            .escape(),
            body(inputGame.author)
            .exists()
            .notEmpty()
            .withMessage('El paramatro autor es requerido')
            .matches(regexField.gauthor, "i")
            .withMessage('El autor no es valido')
            .trim()
            .escape(),
            body(inputGame.image)
            .exists()
            .notEmpty()
            .withMessage('El paramatro imagen es requerido')*/
        game_controller_1.default.validateFile, checkToken_1.default, game_controller_1.default.createGame);
        //Todos los Juegos
        this.router.get(utilities_1.Routers.games, checkToken_1.default, game_controller_1.default.getGames);
        //Juegos del Usuario (por id)
        this.router.get(utilities_1.Routers.ugames, checkToken_1.default, game_controller_1.default.getGamesUid);
        //Juego (por id)
        this.router.get(utilities_1.Routers.gameid, checkToken_1.default, express_validator_1.body(utilities_1.inputGame.gameid)
            .exists()
            .notEmpty()
            .withMessage('El paramatro game id es requerido'), game_controller_1.default.getGame);
        //Eliminar Juegos (por id)
        this.router.get(utilities_1.Routers.gamedelete, checkToken_1.default, game_controller_1.default.deleteGame);
        //Actualizar Juegos (por id)
        this.router.get(utilities_1.Routers.gameupdate, checkToken_1.default, game_controller_1.default.updateGame);
    }
}
const gameRouter = new GameRouter();
exports.default = gameRouter.router;
