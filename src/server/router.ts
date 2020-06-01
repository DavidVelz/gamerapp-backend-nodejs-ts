import { Router } from 'express';
import userModel, {User} from '../models/user.model';
import { Routers } from '../config/config';
import userRouter from '../router/router.user';
import gamesRouter from '../router/router.games';
import verifyToken from '../authentication/verifyToken'

class GamersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {
        //Perfil
        this.router.get(Routers.user, userRouter.getUser);
        //Registro
        this.router.get(Routers.register, userRouter.register);  
        //Nuevo juego      
        this.router.get(Routers.gamecreate, gamesRouter.createGame);
        //Todos los juegos
        this.router.get(Routers.games, verifyToken, gamesRouter.getGames);
        //Juegos del usuario (por id)
        this.router.get(Routers.ugames, verifyToken, gamesRouter.getGamesUid);
        //Eliminar Juegos (por id)
        this.router.get(Routers.gamedelete, gamesRouter.deleteGame);
        //Actualizar Juegos (por id)
        this.router.get(Routers.gameupdate, gamesRouter.updateGame);
        






















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