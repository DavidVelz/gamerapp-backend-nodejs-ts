import { Request, Response, NextFunction, Router } from 'express';
import gameModel, { Game } from '../models/game.model';
import userModel, { User } from '../models/user.model';
import userRouter from '../router/router.user';

class GameRouter {
    router: Router;
    user: User = userRouter.user;
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
        const games = await gameModel.find({ uid: { $regex: req.params.uid } });
        res.json({
            games
        });
    }

    //CreateGame
    public async createGame(req: Request, res: Response): Promise<void> {
        const uid :string = "5ed097838c2c833068b11c44";
        const { 
            gname,
            gdescription,
            gimage,
            ggender,
            gconsole,
            grequirements,
            gauthor,
            } = req.body;
        const game: Game = new gameModel({
            gname,
            gdescription,
            gimage,
            ggender,
            gconsole,
            grequirements,
            gauthor,
            uid
        });

        const db = await game.save();
        console.log();
        res.json({
            db
        });
    }
    
    
    //deleteGame for id
    public async deleteGame(req: Request, res: Response): Promise<void> {

    }
    //updateGame for id
    public async updateGame(req: Request, res: Response): Promise<void> {

    }
}

const gamesRouter = new GameRouter();
export default gamesRouter;