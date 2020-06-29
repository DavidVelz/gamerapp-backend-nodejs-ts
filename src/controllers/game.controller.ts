import { Request, Response, NextFunction, Router } from 'express';
import gameModel, { Game } from '../models/game.model';
import validateFile from '../util/fileBuffer';
import filetype from 'file-type';
import { extImage as ImageType } from '../util/utilities';
import { env } from '../config/config';
import { promises as fs } from 'fs';
import path from 'path';

class GameController {
    router: Router;

    constructor() {
        this.router = Router();
    }

    //Devolver todos los juegos
    public async getGames(req: Request, res: Response): Promise<void> {
        try {
            const games = await gameModel.find();
            res.json({
                msg: "Bienvenid@s a GamersApp",
                games
            });
        } catch (e) {
            console.log(e);
            res.status(500).send('Error obteniendo todos los juegos');
        }
    }

    //Devolver un juego
    public async getGame(req: Request, res: Response): Promise<void> {
        try {
            const game = await gameModel.findById(req.body.gid);
            res.json({
                game
            });
        } catch (e) {
            console.log(e);
            res.status(500).send('Error obteniendo el juego');
        }
    }

    //Juegos por usuario
    public async getGamesUid(req: Request, res: Response): Promise<void> {
        try {
            const games = await gameModel.find({ uid: { $regex: req.body.uid } });
            res.json({
                games
            });
        } catch (e) {
            console.log(e);
            res.status(500).send('Error obteniendo juegos para este usuario');
        }
    }

    //Validar número mágico de la imagen y subirla al servidor
    public async validateFile(req: Request, res: Response, next: NextFunction) {
        try {
            await validateFile(req, res, async () => {
                const gid = req.body.gid;                
                const bufferFile = await filetype.fromBuffer(req.file.buffer);
                let contentType: String[] = [ImageType.jpeg, ImageType.png, ImageType.jpg];
                let isEquals: Boolean = false;
                contentType.forEach((type) => {
                    if (type === bufferFile?.mime) {
                        isEquals = true;
                        return;
                    }
                });

                if (isEquals) {
                    if (gid === undefined) {
                        await fs.writeFile(path.join(process.cwd(), 'uploads', req.file.originalname), req.file.buffer);
                    }
                } else {
                    return res.status(415).send('El formato del archivo no es valido');
                }
                next();
            });
        } catch (e) {
            console.log(e);
            res.status(500).send('Problemas validando la el archivo');
        }
    }

    //Crear juego
    public async createGame(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {
                gname,
                gdescription,
                ggender,
                gconsole,
                grequirements,
                gauthor,
                uid
            } = req.body;

            const gimage = `/${env.desUpload}/${req.file.originalname}`;

            const game: Game = new gameModel({
                gname,
                gdescription,
                ggender,
                gconsole,
                grequirements,
                gauthor,
                gimage,
                uid
            });

            const newGame = await game.save();
            res.json({
                game: newGame
            });
        } catch (e) {
            console.log(e);
            res.status(500).send('Error registrando el juego');
        }
    }

    //Eliminar juego por id
    public async deleteGame(req: Request, res: Response): Promise<void> {
        try {                     
            const currentGame = await gameModel.findById(req.body.gid);
            await gameModel.findByIdAndDelete(req.body.gid);            
            if(currentGame?.gimage !== undefined){           
            await fs.unlink(path.join(process.cwd(), currentGame?.gimage));
        }
            res.json({
                message: "Este juego fue eliminado con éxito",
            });
        } catch (e) {
            console.log(e);
            res.status(500).send('Error eliminando el juego');
        }
    }
    //Actualizar juego
    public async updateGame(req: Request, res: Response): Promise<void> {
        try {
            const _id = req.body.gid;
            const {
                gname,
                gdescription,
                ggender,
                gconsole,
                grequirements,
                gauthor,
                uid
            } = req.body;

            let urlImage = null;
            const currentGame = await gameModel.findById(_id);
            urlImage = `/${env.desUpload}/${req.file.originalname}`;

            if (urlImage !== currentGame?.gimage 
                && currentGame?.gimage !== undefined) {                
                await fs.unlink(path.join(process.cwd(), currentGame?.gimage));
                fs.writeFile(path.join(process.cwd(), 'uploads', req.file.originalname), req.file.buffer);
            }

            const newGame: Game = new gameModel({
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

            const game = await gameModel.findByIdAndUpdate(req.body.gid, newGame, { new: true });
            res.json({
                message: "Juego actualizado con éxito",
                user: game
            });
        } catch (e) {
            console.log(e);
            res.status(500).send('Error actualizando el juego');
        }
    }

    //Eliminar Todos los juegos
    public async deleteGames(req: Request, res: Response): Promise<void> {
        try {
            await gameModel.deleteMany({});
            await fs.rmdir(path.join(process.cwd(), 'uploads'),{ recursive: true });
            res.json({
                message: "Juegos eliminados con éxito",
            });
        } catch (e) {
            console.log(e);
            res.status(500).send('Error eliminando los juegos');
        }
    }
}

const gameController = new GameController();
export default gameController;