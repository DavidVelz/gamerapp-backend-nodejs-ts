import { Router } from 'express';
import userModel, {User} from '../models/user.model';
import { Routers } from '../config/config';
import userRouter from '../router/router.user';
import gamesRouter from '../router/router.games';


class GamersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {
        this.router.get(Routers.user, userRouter.getUser);
        this.router.get(Routers.register, userRouter.register);        
        this.router.get(Routers.gamecreate, gamesRouter.createGame);
        this.router.get(Routers.games, gamesRouter.getGames);
        this.router.get(Routers.ugames, gamesRouter.getGamesUid);
        //5ecdb7dcf447a31b70984bb0






















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
export default gamersroutes.router;