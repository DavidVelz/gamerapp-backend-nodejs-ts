"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utilities_1 = require("../util/utilities");
const express_validator_1 = require("express-validator");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const checkToken_1 = __importDefault(require("../authentication/checkToken"));
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Login
        this.router.get(utilities_1.Routers.login, express_validator_1.body(utilities_1.inputUser.email)
            .exists()
            .withMessage('El paramatro email es requerido')
            .matches(utilities_1.regexField.email, "i")
            .withMessage('El correo no es valido')
            .trim()
            .escape(), express_validator_1.body(utilities_1.inputUser.pass)
            .exists()
            .withMessage('El paramatro password es requerido')
            .matches(utilities_1.regexField.password, "i")
            .withMessage('El password no es valido')
            .trim()
            .escape(), user_controller_1.default.login);
        //Registro
        this.router.get(utilities_1.Routers.register, [
            express_validator_1.body(utilities_1.inputUser.name)
                .exists()
                .notEmpty()
                .withMessage('El paramatro nombre es requerido')
                .matches(utilities_1.regexField.name, "i")
                .withMessage('El nombre no es valido')
                .trim()
                .escape(),
            express_validator_1.body(utilities_1.inputUser.email)
                .exists()
                .notEmpty()
                .withMessage('El paramatro email es requerido')
                .matches(utilities_1.regexField.email, "i")
                .withMessage('El correo no es valido')
                .trim()
                .escape(),
            express_validator_1.body(utilities_1.inputUser.pass)
                .exists()
                .notEmpty()
                .withMessage('El paramatro password es requerido')
                .matches(utilities_1.regexField.password, "i")
                .withMessage('El password no es valido')
                .trim()
                .escape(),
            express_validator_1.body(utilities_1.inputUser.age)
                .exists()
                .notEmpty()
                .withMessage('El paramatro edad es requerido')
                .matches(utilities_1.regexField.age, "i")
                .withMessage('La edad no es valida')
                .trim()
                .escape(),
        ], user_controller_1.default.register);
        //Usuarios
        this.router.get(utilities_1.Routers.users, checkToken_1.default, user_controller_1.default.getUsers);
        //Perfil
        this.router.get(utilities_1.Routers.user, checkToken_1.default, user_controller_1.default.getUser);
        //Eliminar Usuario (por id)
        this.router.get(utilities_1.Routers.userdelete, checkToken_1.default, user_controller_1.default.deleteUser);
        //Actualizar Usuario (por id)
        this.router.get(utilities_1.Routers.userupdate, checkToken_1.default, user_controller_1.default.updateUser);
    }
}
const userRouter = new UserRouter();
exports.default = userRouter.router;
