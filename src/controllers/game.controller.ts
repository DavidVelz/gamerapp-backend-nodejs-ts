import { Request, Response, NextFunction, Router } from 'express';
import gameModel, { Game } from '../models/game.model';
import validete from '../util/fileBuffer';
import filetype from 'file-type';
import { extImage } from '../util/utilities';
import { env } from '../config/config';
import { promises as fs } from 'fs';
import path from 'path';
import { validationResult } from 'express-validator';

class GameController {
    router: Router;

    constructor() {
        this.router = Router();
    }

    //getGames
    public async getGames(req: Request, res: Response): Promise<void> {
        const games = await gameModel.find();
        res.json({
            games
        });
    }
    public async getGame(req: Request, res: Response): Promise<void> {
        const game = await gameModel.findById(req.body.gid);
        res.json({
            game
        });
    }
    //getGame for id
    public async getGamesUid(req: Request, res: Response): Promise<void> {
        const games = await gameModel.find({ uid: { $regex: req.body.uid } });
        res.json({
            games
        });
    }

    public async validateFile(req: Request, res: Response, next: NextFunction) {
        try {           
            const error = validationResult(req);
            if (error.isEmpty()) {
                await validete(req, res, async () => {
                    const bufferFile = await filetype.fromBuffer(req.file.buffer);

                    let contentType: String[] = [extImage.jpeg, extImage.png, extImage.jpg];

                    let isEquals: Boolean = false;
                    contentType.forEach((type) => {
                        if (type === bufferFile?.mime) {
                            isEquals = true;
                            return;
                        }
                    });

                    if (isEquals) {
                        await fs.writeFile(path.join(process.cwd(), 'uploads', req.file.originalname), req.file.buffer);
                    } else {
                        return res.status(500).send('El formato del archivo no es valido');
                    }
                    next();
                });
            } else {
                console.log(error);
                res.json({ errorInput: error });
            }
        } catch (e) {
            console.log(e);
            res.json({ errorValidate: e });
        }
    }

    //CreateGame
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

            const db = await game.save();
            res.json({
                game: db
            });
        } catch (error) {
            //Eliminar la imagen en caso de errores
            res.json({ errorDb: error })
        }
    }

    //deleteGame for id
    public async deleteGame(req: Request, res: Response): Promise<void> {
        try {
            const game = await gameModel.findByIdAndDelete(req.body.gid);
            res.json({
                message: "Este juego fue eliminado con éxito",
            })
        } catch (error) {
            res.json({
                messagerror: error,
            })
        }
    }
    //updateGame for id
    public async updateGame(req: Request, res: Response): Promise<void> {
        try {
            const game = await gameModel.findByIdAndUpdate(req.body.gid, req.body);
            res.json({
                message: "Este juego fue actualizado con éxito"
            })
        } catch (error) {
            res.json({
                messagerror: error
            })
        }
    }
}

const gameController = new GameController();
export default gameController;