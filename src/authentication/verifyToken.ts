import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import { secret }from '../config/config';
import { User } from '../models/user.model';

async function verifyToken(req:Request, res:Response, next:NextFunction) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }
    
    // Decode the Tokenreq.userId = decoded.id;
    const decoded = await jwt.verify(token.toString(),secret.secret);
    
    //req.body.id = decoded;
    res.send(decoded)
    next();
}

export default verifyToken;