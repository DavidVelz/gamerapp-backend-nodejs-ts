import { body, ValidationChain } from "express-validator";
import { regexFields } from "./utilities";
import 'express-validator';

declare module 'express-validator' {
  interface ValidationChain {
   validateEmail(): ValidationChain;
  }
}

function validateEmail(username: string) : ValidationChain {  
  return body(username)
    .exists()
    .withMessage('El paramatro email es requerido')
    .matches(regexFields.email, "i")
    .withMessage('El email no es valido')
    .trim()
    .escape()
}

export default validateEmail;



