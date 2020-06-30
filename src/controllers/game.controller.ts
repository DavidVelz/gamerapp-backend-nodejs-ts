import { Request, Response, NextFunction, Router } from 'express';
import gameModel, { Game } from '../models/game.model';
import validateBuffer from '../storage/buffer.file';
import { extImage as ImageType } from '../util/utilities';
import handlerfile from '../storage/handler.file';
import { env } from '../config/config';
import filetype from 'file-type';
import filesys, { promises as fs } from 'fs';
import path from 'path';
import del from 'del';


class GameController {
    router: Router;

    constructor() {
        this.router = Router();
    }

    //Devolver todos los juegos
    public async getGames(req: Request, res: Response): Promise<void> {
        try {
            const games = await gameModel.find();
            if (games) {
                res.json({
                    msg: "Bienvenid@s a GamersApp",
                    games
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send('Error obteniendo todos los juegos');
        }
    }

    //Devolver un juego
    public async getGame(req: Request, res: Response): Promise<void> {
        try {
            const game = await gameModel.findById(req.body.gid);
            if (game) {
                res.json({
                    game
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send('Error obteniendo el juego');
        }
    }

    //Juegos por usuario
    public async getGamesUid(req: Request, res: Response): Promise<void> {
        try {
            const games = await gameModel.find({ uid: { $regex: req.body.uid } });
            if (games) {
                res.json({
                    games
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send('Error obteniendo juegos para este usuario');
        }
    }

    //Validar número mágico de la imagen y subirla al servidor
    public async validateFile(req: Request, res: Response, next: NextFunction) {
        try {
            await validateBuffer(req, res, async () => {
                const gid = req.body.gid;
                const contentType = await filetype.fromBuffer(req.file.buffer);
                let mimeTypes: String[] = [ImageType.jpeg, ImageType.png, ImageType.jpg];
                let isMatch: Boolean = false;
                mimeTypes.forEach((type) => {
                    if (type === contentType?.mime) {
                        isMatch = true;
                        return;
                    }
                });
                if (isMatch) {
                    if (gid === undefined) {
                        const dirPath = await handlerfile.currentPatch('uploads');
                        const newPath = await handlerfile.newPatch(req.file.originalname);
                        await handlerfile.fileUpload(dirPath, newPath, req.file.buffer);
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
            const { gname, gdescription, ggender, gconsole, grequirements,
                gauthor, uid } = req.body;
            const gimage = `/${env.desUpload}/${req.file.originalname}`;

            const game: Game = new gameModel({
                gname, gdescription, ggender, gconsole, grequirements,
                gauthor, gimage, uid
            });

            const newGame = await game.save();
            if (newGame) {
                res.json({
                    game: newGame
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send('Error registrando el juego');
        }
    }

    //Eliminar juego por id
    public async deleteGame(req: Request, res: Response): Promise<void> {
        try {
            const currentGame = await gameModel.findById(req.body.gid);
            const game = await gameModel.findByIdAndDelete(req.body.gid);
            if (game) {
                if (currentGame?.gimage !== undefined) {
                    if (filesys.existsSync(path.join(process.cwd(), currentGame?.gimage))) {
                        await fs.unlink(path.join(process.cwd(), currentGame?.gimage));
                    } else {
                        res.json({
                            message: "El archivo del juego no existe",
                        });
                    }
                }
                res.json({
                    message: "Este juego fue eliminado con éxito",
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send('Error eliminando el juego');
        }
    }

    //Actualizar juego
    public async updateGame(req: Request, res: Response): Promise<void> {
        try {
            const _id = req.body.gid;
            const newImage = `/${env.desUpload}/${req.file.originalname}`;
            const { gname, gdescription, ggender, gconsole, grequirements,
                gauthor, uid } = req.body;

            const newGame: Game = new gameModel({
                _id, gname, gdescription, ggender, gconsole, grequirements,
                gauthor, gimage: newImage, uid
            });
            const currentGame = await gameModel.findById(_id);
            const game = await gameModel.findByIdAndUpdate(_id, newGame, { new: true });

            if (game) {
                if (newImage !== currentGame?.gimage
                    && currentGame?.gimage !== undefined) {
                    const currentPath = await handlerfile.currentPatch(currentGame?.gimage);
                    const newPath = await handlerfile.newPatch(req.file.originalname);
                    await handlerfile.deleteFileUpload(currentPath, newPath, req.file.buffer);
                }
                res.json({
                    message: "Juego actualizado con éxito",
                    user: game
                });
            } else {
                res.status(404).send('Juego no encontrado');
            }
        } catch (e) {
            console.log(e);
            res.status(500).send('Error actualizando el juego');
        }
    }

    //Eliminar Todos los juegos
    public async deleteGames(req: Request, res: Response): Promise<void> {
        try {
            await gameModel.deleteMany({});
            const urlPath = path.join(process.cwd(), 'uploads');
            if (filesys.existsSync(urlPath)) {
                await del(urlPath);
            }
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