import { Request, Response, NextFunction, Router } from 'express';
import userModel, { User } from '../models/user.model';



class UserRouter {
    router : Router;
    user!: User;
    constructor() {        
        this.router = Router();        
    }

    //Login
    public async login(req: Request, res: Response): Promise<void>{
        
    }
    //Register
    public async register(req: Request, res: Response): Promise<void>{
        const { uname, uemail, upass, uage } = req.body;
            const user: User = new userModel({
                uname,
                uemail,
                upass,
                uage
            });

            const db = await user.save();
                        
            res.json({
                text : 'Usuario registrado',
                user               
            });

            this.user = db;
    }
    
    //getUser
    public async getUser(req: Request, res: Response): Promise<void>{
        const user = await userModel.findById(req.params.id);
        res.json({
            user
        });
    }    
}

const userRouter = new UserRouter();
export default userRouter;