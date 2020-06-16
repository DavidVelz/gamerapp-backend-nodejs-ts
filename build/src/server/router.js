"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routers_1 = require("./routers");
const router_user_1 = __importDefault(require("../router/router.user"));
const router_games_1 = __importDefault(require("../router/router.games"));
const checkToken_1 = __importDefault(require("../authentication/checkToken"));
const utilities_1 = require("../util/utilities");
const express_validator_1 = require("express-validator");
class GamersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        /********************USER****************************/
        //login
        this.router.get(routers_1.Routers.login, express_validator_1.body('uemail')
            .exists()
            .withMessage('El paramatro email es requerido')
            .matches(utilities_1.regexFields.email, "i")
            .withMessage('El correo no es valido')
            .trim()
            .escape(), express_validator_1.body('upass')
            .exists()
            .withMessage('El paramatro password es requerido')
            .matches(utilities_1.regexFields.password, "i")
            .withMessage('El password no es valido')
            .trim()
            .escape(), router_user_1.default.login);
        //Registro
        this.router.get(routers_1.Routers.register, [
            express_validator_1.body('uname')
                .exists()
                .withMessage('El paramatro nombre es requerido')
                .matches(utilities_1.regexFields.name, "i")
                .withMessage('El nombre no es valido')
                .trim()
                .escape(),
            express_validator_1.body('uemail')
                .exists()
                .withMessage('El paramatro email es requerido')
                .matches(utilities_1.regexFields.email, "i")
                .withMessage('El correo no es valido')
                .trim()
                .escape(),
            express_validator_1.body('upass')
                .exists()
                .withMessage('El paramatro password es requerido')
                .matches(utilities_1.regexFields.password, "i")
                .withMessage('El password no es valido')
                .trim()
                .escape(),
            express_validator_1.body('uage')
                .exists()
                .withMessage('El paramatro edad es requerido')
                .matches(utilities_1.regexFields.age, "i")
                .withMessage('La edad no es valida')
                .trim()
                .escape(),
        ], router_user_1.default.register);
        //usuarios
        this.router.get(routers_1.Routers.users, router_user_1.default.getUsers);
        //Perfil
        this.router.get(routers_1.Routers.user, checkToken_1.default, router_user_1.default.getUser);
        //Eliminar usuario (por id)
        this.router.get(routers_1.Routers.userdelete, checkToken_1.default, router_user_1.default.deleteUser);
        //Actualizar usuario (por id)
        this.router.get(routers_1.Routers.userupdate, checkToken_1.default, router_user_1.default.updateUser);
        /********************GAME****************************/
        //Nuevo juego      
        this.router.get(routers_1.Routers.gamecreate, checkToken_1.default, router_games_1.default.createGame);
        //Todos los juegos
        this.router.get(routers_1.Routers.games, checkToken_1.default, router_games_1.default.getGames);
        //Juegos del usuario (por id)
        this.router.get(routers_1.Routers.ugames, checkToken_1.default, router_games_1.default.getGamesUid);
        //Eliminar Juegos (por id)
        this.router.get(routers_1.Routers.gamedelete, checkToken_1.default, router_games_1.default.deleteGame);
        //Actualizar Juegos (por id)
        this.router.get(routers_1.Routers.gameupdate, checkToken_1.default, router_games_1.default.updateGame);
    }
}
const gamersroutes = new GamersRoutes();
exports.default = gamersroutes.router;
