import { Request, Response, NextFunction, Router } from 'express';
import gameModel, { Game } from '../models/game.model';
import path from 'path';
import multer from 'multer';
import fs from 'fs-extra';
import uploadImage from '../util/uploadFiles';
class GameRouter {
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
    //getGame for id
    public async getGamesUid(req: Request, res: Response): Promise<void> {
        const games = await gameModel.find({ uid: { $regex: req.body.uid } });
        res.json({
            games
        });
    }

    //CreateGame
    public async createGame(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const uuid = req.body.uid;
            await uploadImage(req, res, async () => {
                
                const {
                    gname,
                    gdescription,
                    ggender,
                    gconsole,
                    grequirements,
                    gauthor
                } = req.body;

                const gimage = `/uploads/${req.file.originalname}`;
                
                const game: Game = new gameModel({
                    gname,
                    gdescription,
                    ggender,
                    gconsole,
                    grequirements,
                    gauthor,
                    gimage,
                    uuid
                });

                const db = await game.save();                
                res.json({
                    game: db
                });
            });
           
        } catch (error) {
            res.json({ error: error })
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

const gamesRouter = new GameRouter();
export default gamesRouter;