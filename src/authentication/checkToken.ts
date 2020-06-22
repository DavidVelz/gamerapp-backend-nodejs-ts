import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/config';
import { User } from '../models/user.model';
//import { decoded } from '../models/decoded.model';

export interface IDecoded {
    id: string;
    iat: number;
} 

async function checkToken(req:Request, res:Response, next:NextFunction) {
    try {        
        const tokenString = req.headers.authorization as String;
        const token = tokenString.split(" ")[1];        
        if (!token) { 
            return res.status(401).send({ auth: false, message: 'No tienes un token validos' });
        }
        
        // Decodificar el token para obtener el id de usuario
        const decoded = await jwt.verify(token, env.mysecret) as IDecoded; 
        req.body.uid = decoded.id;         
        next();
    } catch (e) {
        console.log(e)
            res.status(500).send('Problemas para validar un usuario');
    }   
}

export default checkToken;