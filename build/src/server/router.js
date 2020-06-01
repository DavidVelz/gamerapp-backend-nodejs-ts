"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../config/config");
const router_user_1 = __importDefault(require("../router/router.user"));
const router_games_1 = __importDefault(require("../router/router.games"));
const verifyToken_1 = __importDefault(require("../authentication/verifyToken"));
class GamersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Perfil
        this.router.get(config_1.Routers.user, router_user_1.default.getUser);
        //Registro
        this.router.get(config_1.Routers.register, router_user_1.default.register);
        //Nuevo juego      
        this.router.get(config_1.Routers.gamecreate, router_games_1.default.createGame);
        //Todos los juegos
        this.router.get(config_1.Routers.games, verifyToken_1.default, router_games_1.default.getGames);
        //Juegos del usuario (por id)
        this.router.get(config_1.Routers.ugames, router_games_1.default.getGamesUid);
        //Eliminar Juegos (por id)
        this.router.get(config_1.Routers.gamedelete, router_games_1.default.deleteGame);
        //Actualizar Juegos (por id)
        this.router.get(config_1.Routers.gameupdate, router_games_1.default.updateGame);
        /*this.router.get('/login', (req,res,next) =>{
            res.json({
                text: 'login'
            });
        });
        /*this.router.get('/create', async (req,res,next)  => {
            const { uname, uemail, upass } = req.body;
            const user: User = new userModel ({
                uname,
                uemail,
                upass
            });

            const db = await user.save();
            console.log();
            res.json({
                text: db.id
            });

        });*/
    }
}
const gamersroutes = new GamersRoutes();
exports.default = gamersroutes.router;
