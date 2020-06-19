import { Request, Response, NextFunction, Router } from 'express'
import gameModel, { Game } from '../models/game.model'
import uploadImage from '../util/multerUpload'
import validationImage from '../util/multerValidation'
import filetype from 'file-type';
import { extImage } from '../util/utilities';


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
            await validationImage(req, res, async () => {
                 const bf = await filetype.fromBuffer(req.file.buffer);
                 if (bf?.mime != extImage.jpg ||
                    bf?.mime != extImage.jpeg) {
                    console.log("imagen valida");
                 } else{
                    res.send("error en la imagen");
                 };                 
             });


            const {uid} = req.body;
            
            await uploadImage(req, res, async () => {

                const {
                    gname,
                    gdescription,
                    ggender,
                    gconsole,
                    grequirements,
                    gauthor } = req.body;

                const gimage = `/uploads/${req.file.originalname}`;

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

const gameController = new GameController();
export default gameController;