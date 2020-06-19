import { Request, Response, NextFunction, Router, Errback } from 'express';
import userModel, { User } from '../models/user.model';
import gameModel, { Game } from '../models/game.model';
import { env } from '../config/config';
import jwt from 'jsonwebtoken';
const users = require('../models/user.model');
import { validationResult } from "express-validator";

class UserController {
    
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
                                res.json({
                                    auth: false,
                                    msg: 'El correo o el usuario es incorrecto'
                                });
                            }
                        } else {
                            res.json({ auth: false, msg: 'usuario no encontrado' });
                        }
                    });
            } else {
                res.json({
                    errorRegex: error
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
            const error = validationResult(req);
            if (error.isEmpty()) {
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
            } else {
                res.json({ errorRegex: error })
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('There was a problem registering your user');
        }
    }

    //getUser
    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await userModel.findById(req.body.uid);
            res.json({
                user
            });
        } catch (error) {
            res.json({
                getUserError: error
            })
        }

    }
    //getUser
    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userModel.find();
            res.json({
                users
            });
        } catch (error) {
            res.json({
                getUsersError: error
            })
        }

    }
    //Update user
    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const {uid, uname, uemail, upass, uage } = req.body;
            var userUpdate: User = new userModel({
                uname,
                uemail,
                upass,
                uage
            });
            userUpdate.upass = await userUpdate.encryptPassword(req.body.upass);
            const userUp = await userModel.findByIdAndUpdate({_id : uid},{userUpdate},{new: true});
            
            res.json({
                message: "Usuario actualizado con éxito",
                user: userUp
            })
        } catch (error) {
            res.json({
                updateError: error
            })
        }

    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await userModel.findByIdAndDelete(req.body.uid);
            if (user) {
                await gameModel.deleteMany({ uid: { $regex: user._id } });
            }
            res.json({
                message: "Este usuario fue eliminado con éxito",
            })
        } catch (error) {
            res.json({
                deleteError: error,
            })
        }

    }

}

const userController = new UserController();
export default userController;