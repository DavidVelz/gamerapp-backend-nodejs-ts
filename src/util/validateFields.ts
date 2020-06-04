import  { body } from "express-validator";
import { Request, Response, NextFunction } from 'express';

export async function validateRegister(req:Request, res:Response, next:NextFunction){
    const {uname , uemail, upass, uage  } = req.body;
    body(uname)
    .exists()
    .withMessage('El paramatro Uno es requerido')
    .matches('.+@[a-zA-Z]+(\\.?[a-zA-Z]{2,3}?)\\.[a-zA-Z]{2,3}"')    
    .withMessage('El correo no es valido')
    .trim()
    .escape(),
    body(uemail)
    .exists()
    .withMessage('El paramatro Dos es requerido')
    .matches('.+@[a-zA-Z]+(\\.?[a-zA-Z]{2,3}?)\\.[a-zA-Z]{2,3}')
    .withMessage('El correo no es valido') 
    .trim()
    .escape(),
    body(upass)
    .exists()
    .withMessage('El paramatro Dos es requerido')
    .matches(/^[0-9]+$/, "i")
    .withMessage('El parametro Dos debe ser numerico') 
    .trim()
    .escape(),
    body(uage)
    .exists()
    .withMessage('El paramatro Dos es requerido')
    .matches(/^[0-9]+$/, "i")
    .withMessage('El parametro Dos debe ser numerico') 
    .trim()
    .escape()
}
export async function validateLogin(req:Request, res:Response, next:NextFunction){
    const { uemail, upass  } = req.body;
    body(uemail)
    .exists()
    .withMessage('El paramatro Uno es requerido')
    .matches(".+@[a-zA-Z]+(\\.?[a-zA-Z]{2,3}?)\\.[a-zA-Z]{2,3}")    
    .withMessage('El correo no es valido')
    .trim()
    .escape(),
    body(upass)
    .exists()
    .withMessage('El paramatro Dos es requerido')
    .matches(/^[0-9]+$/)
    .withMessage('El parametro Dos debe ser numerico') 
    .trim()
    .escape(),

    next();
}

