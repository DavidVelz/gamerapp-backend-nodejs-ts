import { Router } from "express";
import { regexField, inputUser, Routers } from "../util/utilities";
import { body } from "express-validator";
import userController from "../controllers/user.controller";
import checkToken from "../authentication/checkToken";

class UserRouter{

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Login
        this.router.get(Routers.login,           
            body(inputUser.email)
                .exists()
                .withMessage('El paramatro email es requerido')
                .matches(regexField.email, "i")
                .withMessage('El correo no es valido')
                .trim()
                .escape(),
            body(inputUser.pass)
                .exists()
                .withMessage('El paramatro password es requerido')
                .matches(regexField.password, "i")
                .withMessage('El password no es valido')
                .trim()
                .escape()            
            , userController.login);

        //Registro
        this.router.get(Routers.register, [
            body(inputUser.name)
                .exists()
                .notEmpty()
                .withMessage('El paramatro nombre es requerido')
                .matches(regexField.name, "i")
                .withMessage('El nombre no es valido')
                .trim()
                .escape(),
            body(inputUser.email)
                .exists()
                .notEmpty()
                .withMessage('El paramatro email es requerido')
                .matches(regexField.email, "i")
                .withMessage('El correo no es valido')
                .trim()
                .escape(),
            body(inputUser.pass)
                .exists()
                .notEmpty()
                .withMessage('El paramatro password es requerido')
                .matches(regexField.password, "i")
                .withMessage('El password no es valido')
                .trim()
                .escape(),
            body(inputUser.age)
                .exists()
                .notEmpty()
                .withMessage('El paramatro edad es requerido')
                .matches(regexField.age, "i")
                .withMessage('La edad no es valida')
                .trim()
                .escape(),
        ], userController.register);

        //Usuarios
        this.router.get(Routers.users, checkToken, userController.getUsers);

        //Perfil
        this.router.get(Routers.user, checkToken, userController.getUser);

        //Eliminar Usuario (por id)
        this.router.get(Routers.userdelete, checkToken, userController.deleteUser);

        //Actualizar Usuario (por id)
        this.router.get(Routers.userupdate, checkToken, userController.updateUser);

        //Cerrar sesión
        this.router.get(Routers.logout, checkToken, userController.logout);
    }
}
const userRouter = new UserRouter();
export default userRouter.router;