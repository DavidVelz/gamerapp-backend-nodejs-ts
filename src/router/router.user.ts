import { Request, Response, NextFunction, Router, Errback } from 'express';
import userModel, { User } from '../models/user.model';
import { env } from '../config/config';
import jwt from 'jsonwebtoken';
const users = require('../models/user.model');
import { validationResult } from "express-validator";

class UserRouter {
    router: Router;
    constructor() {
        this.router = Router();
    }

    //Login
    public async login(req: Request, res: Response): Promise<void> {
        try {
            
            const error = validationResult(req);

            if (error.isEmpty()) {
                const { uemail, upass } = req.body;
                await userModel.findOne({ uemail: { $regex: uemail } })
                    .then(async (user) => {
                        if (user) {
                            const equals = await user.comparePassword(upass);
                            console.log(equals);
                            if (equals) {
                                const token = jwt.sign({ id: user._id }, env.mysecret, {
                                    expiresIn: env.expiresIn
                                });
                                res.json({ auth: true, token });
                            } else {
                                res.json({ auth: false });
                            }
                        } else {
                            res.json({ auth: false, msg: 'usuario no encontrado' });
                        }
                    });
            } else {
                res.json({
                    error : 'Correo o clave incorrectos'
                })
            }


        } catch (e) {
            console.log(e)
            res.status(500).send('There was a problem registering your user');
        }
    }
    //Register
    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { uname, uemail, upass, uage } = req.body;
            const user: User = new userModel({
                uname,
                uemail,
                upass,
                uage
            });
            user.upass = await user.encryptPassword(upass);
            const us = await user.save();

            const token = jwt.sign({ id: user._id }, env.mysecret, {
                expiresIn: env.expiresIn
            });
            res.json({ auth: true, token });
        } catch (e) {
            console.log(e)
            res.status(500).send('There was a problem registering your user');
        }
    }

    //getUser
    public async getUser(req: Request, res: Response): Promise<void> {
        const user = await userModel.findById(req.params.id);
        res.json({
            user
        });
    }
    //getUser
    public async getUsers(req: Request, res: Response): Promise<void> {
        const users = await userModel.find();
        res.json({
            users
        });
    }
}

const userRouter = new UserRouter();
export default userRouter;