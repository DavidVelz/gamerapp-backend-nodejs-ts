import { Router } from 'express';
import userModel, {User} from '../models/user.model';
import { Routers } from './routers';
import userRouter from '../router/router.user';
import gamesRouter from '../router/router.games';
import checkToken from '../authentication/checkToken';
import {validateLogin, validateRegister } from '../util/validateFields';

class GamersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {
        //login
        this.router.get(Routers.login, validateLogin, userRouter.login);
        //usuarios
        this.router.get(Routers.users, userRouter.getUsers);
        //Perfil
        this.router.get(Routers.user,checkToken, userRouter.getUser);
        //Registro
        this.router.get(Routers.register,validateRegister, userRouter.register);  
        //Nuevo juego      
        this.router.get(Routers.gamecreate,checkToken, gamesRouter.createGame);
        //Todos los juegos
        this.router.get(Routers.games, checkToken, gamesRouter.getGames);
        //Juegos del usuario (por id)
        this.router.get(Routers.ugames, checkToken, gamesRouter.getGamesUid);
        //Eliminar Juegos (por id)
        this.router.get(Routers.gamedelete,checkToken, gamesRouter.deleteGame);
        //Actualizar Juegos (por id)
        this.router.get(Routers.gameupdate,checkToken, gamesRouter.updateGame);
    }
}

class routers {
    Router = {
        login: "/login",
        register: "/register",
        games: "/games",
        ugames: "/ugames",
        user: "/user",
        gamecreate: "/creategame",
        gameid: "/game",
        gamedelete: "/deletegame",
        gameupdate: "/updategame",
    }
}

const gamersroutes = new GamersRoutes();
export default gamersroutes.router;