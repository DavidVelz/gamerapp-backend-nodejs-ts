import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/config';
import { User } from '../models/user.model';
//import { decoded } from '../models/decoded.model';

export interface IPayload {
    id: string;
    iat: number;
} 

async function checkToken(req:Request, res:Response, next:NextFunction) {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided' });
        }
        
        // Decodificar el token para obtener el id de usuario
        const payload = await jwt.verify(token.toString(),env.mysecret) as IPayload;    
        req.body.id = payload.id;    
        next();
    } catch (e) {
        console.log(e)
            res.status(500).send('There was a problem registering your user');
    }   
}

export default checkToken;