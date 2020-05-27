import { Router } from 'express';
import userModel, {User} from '../models/user.model';
class GamersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/login', (req,res,next) =>{
            res.json({
                text: 'login'
            });

        });
        this.router.get('/create', async (req,res,next)  => {
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

        });
        this.router.get('/profile', (req,res,next) =>{
            res.json({
                text: 'profile'
            });
        });

        this.router.get('/users',async (req,res,next) =>{
            const users = await userModel.find();
            res.json({
                users
            });

        });
    }

}

const gamersroutes = new GamersRoutes();
export default gamersroutes.router;