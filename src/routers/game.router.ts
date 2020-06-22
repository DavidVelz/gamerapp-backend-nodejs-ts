import { Router, request, NextFunction } from 'express';
import gameController from '../controllers/game.controller';
import checkToken from '../authentication/checkToken';
import { body } from "express-validator";
import { inputGame, Routers } from '../util/utilities';
import multer from 'multer';

class GameRouter {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Nuevo Juego 
        this.router.get(Routers.gamecreate,
            body(inputGame.name)
                .exists()
                .notEmpty()
                .withMessage('El paramatro nombre del juego es requerido')
                .trim()
                .escape(),
            body(inputGame.description)
                .exists()
                .notEmpty()
                .withMessage('El paramatro descripción es requerido')
                .trim()
                .escape(),
            body(inputGame.gender)
                .exists()
                .notEmpty()
                .withMessage('El paramatro genero es requerido')
                .trim()
                .escape(),
                body(inputGame.console)
                .exists()
                .notEmpty()
                .withMessage('El paramatro consola es requerido')
                .trim()
                .escape(),
                body(inputGame.requirements)
                .exists()
                .notEmpty()
                .withMessage('El paramatro requerimientos es requerido')
                .trim()
                .escape(),
                body(inputGame.author)
                .exists()
                .notEmpty()
                .withMessage('El paramatro autor es requerido')
                .trim()
                .escape(),
                body(inputGame.image)
                .exists()                
                .notEmpty()
                .withMessage('El paramatro imagen es requerido'),
                body(inputGame.uid)
                .exists()                
                .notEmpty()
                .withMessage('El paramatro uid es requerido')                           
            ,gameController.validateImages,gameController.uploadImages,checkToken, gameController.createGame);

        //Todos los Juegos
        this.router.get(Routers.games, checkToken, gameController.getGames);

        //Juegos del Usuario (por id)
        this.router.get(Routers.ugames, checkToken, gameController.getGamesUid);

        //Eliminar Juegos (por id)
        this.router.get(Routers.gamedelete, checkToken, gameController.deleteGame);

        //Actualizar Juegos (por id)
        this.router.get(Routers.gameupdate, checkToken, gameController.updateGame);
    }
}

const gameRouter = new GameRouter();
export default gameRouter.router;