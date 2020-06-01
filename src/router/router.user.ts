import { Request, Response, NextFunction, Router } from 'express';
import userModel, { User } from '../models/user.model';
import { secret } from '../config/config';
import  jwt  from 'jsonwebtoken';
const user = require('../models/user.model');


class UserRouter {
    router : Router; 
    constructor() {   
        this.router = Router();        
    }

    //Login
    public async login(req: Request, res: Response): Promise<void>{
        
    }
    //Register
    public async register(req: Request, res: Response): Promise<void>{
        try{
        const { uname, uemail, upass, uage } = req.body;
            const user: User = new userModel({
                uname,
                uemail,
                upass,
                uage
            });
            user.upass = await user.encryptPassword(upass);
            const us = await user.save(); 

            const token = jwt.sign({ id: user._id }, secret.secret, {
                expiresIn: 60 * 60 * 24 // expires in 24 hours
            });
            res.json({ auth: true, token });
        } catch (e) {
            console.log(e)
            res.status(500).send('There was a problem registering your user');
        }
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