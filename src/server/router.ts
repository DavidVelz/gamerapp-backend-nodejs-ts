import { Router, request,NextFunction } from 'express';
import { Routers } from './routers';
import userRouter from '../router/router.user';
import gamesRouter from '../router/router.games';
import checkToken from '../authentication/checkToken';
import { regexFields } from '../util/utilities';
import { body } from "express-validator";
import { extImage } from '../util/utilities'
import filetype from 'file-type';
import uploadImage from '../util/multerUpload'
import validationImage from '../util/multerValidation'
import multer from 'multer'
import path from 'path'

class GamersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }


    config(): void {
        /********************USER****************************/

        //login
        this.router.get(Routers.login,           
            body('uemail')
                .exists()
                .withMessage('El paramatro email es requerido')
                .matches(regexFields.email, "i")
                .withMessage('El correo no es valido')
                .trim()
                .escape(),
            body('upass')
                .exists()
                .withMessage('El paramatro password es requerido')
                .matches(regexFields.password, "i")
                .withMessage('El password no es valido')
                .trim()
                .escape()            
            , userRouter.login);
        //Registro
        this.router.get(Routers.register, [
            body('uname')
                .exists()
                .withMessage('El paramatro nombre es requerido')
                .matches(regexFields.name, "i")
                .withMessage('El nombre no es valido')
                .trim()
                .escape(),
            body('uemail')
                .exists()
                .withMessage('El paramatro email es requerido')
                .matches(regexFields.email, "i")
                .withMessage('El correo no es valido')
                .trim()
                .escape(),
            body('upass')
                .exists()
                .withMessage('El paramatro password es requerido')
                .matches(regexFields.password, "i")
                .withMessage('El password no es valido')
                .trim()
                .escape(),
            body('uage')
                .exists()
                .withMessage('El paramatro edad es requerido')
                .matches(regexFields.age, "i")
                .withMessage('La edad no es valida')
                .trim()
                .escape(),
        ], userRouter.register);

        //usuarios
        this.router.get(Routers.users, userRouter.getUsers);
        //Perfil
        this.router.get(Routers.user, checkToken, userRouter.getUser);
        //Eliminar usuario (por id)
        this.router.get(Routers.userdelete, checkToken, userRouter.deleteUser);
        //Actualizar usuario (por id)
        this.router.get(Routers.userupdate, checkToken, userRouter.updateUser);
        /********************GAME****************************/
        //Nuevo juego      
        this.router.get(Routers.gamecreate, checkToken,gamesRouter.createGame);              
        
        //Todos los juegos
        this.router.get(Routers.games, checkToken, gamesRouter.getGames);
        //Juegos del usuario (por id)
        this.router.get(Routers.ugames, checkToken, gamesRouter.getGamesUid);
        //Eliminar Juegos (por id)
        this.router.get(Routers.gamedelete, checkToken, gamesRouter.deleteGame);
        //Actualizar Juegos (por id)
        this.router.get(Routers.gameupdate, checkToken, gamesRouter.updateGame);
    }
}

const gamersroutes = new GamersRoutes();
export default gamersroutes.router;