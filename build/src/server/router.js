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
class GamersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //login
        this.router.get(routers_1.Routers.login, router_user_1.default.login);
        //usuarios
        this.router.get(routers_1.Routers.users, router_user_1.default.getUsers);
        //Perfil
        this.router.get(routers_1.Routers.user, router_user_1.default.getUser);
        //Registro
        this.router.get(routers_1.Routers.register, router_user_1.default.register);
        //Nuevo juego      
        this.router.get(routers_1.Routers.gamecreate, router_games_1.default.createGame);
        //Todos los juegos
        this.router.get(routers_1.Routers.games, checkToken_1.default, router_games_1.default.getGames);
        //Juegos del usuario (por id)
        this.router.get(routers_1.Routers.ugames, checkToken_1.default, router_games_1.default.getGamesUid);
        //Eliminar Juegos (por id)
        this.router.get(routers_1.Routers.gamedelete, router_games_1.default.deleteGame);
        //Actualizar Juegos (por id)
        this.router.get(routers_1.Routers.gameupdate, router_games_1.default.updateGame);
    }
}
class routers {
    constructor() {
        this.Router = {
            login: "/login",
            register: "/register",
            games: "/games",
            ugames: "/ugames",
            user: "/user",
            gamecreate: "/creategame",
            gameid: "/game",
            gamedelete: "/deletegame",
            gameupdate: "/updategame",
        };
    }
}
const gamersroutes = new GamersRoutes();
exports.default = gamersroutes.router;
