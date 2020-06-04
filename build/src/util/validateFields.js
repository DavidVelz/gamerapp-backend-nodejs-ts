"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
function validateRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uname, uemail, upass, uage } = req.body;
        express_validator_1.body(uname)
            .exists()
            .withMessage('El paramatro Uno es requerido')
            .matches('.+@[a-zA-Z]+(\\.?[a-zA-Z]{2,3}?)\\.[a-zA-Z]{2,3}"')
            .withMessage('El correo no es valido')
            .trim()
            .escape(),
            express_validator_1.body(uemail)
                .exists()
                .withMessage('El paramatro Dos es requerido')
                .matches('.+@[a-zA-Z]+(\\.?[a-zA-Z]{2,3}?)\\.[a-zA-Z]{2,3}')
                .withMessage('El correo no es valido')
                .trim()
                .escape(),
            express_validator_1.body(upass)
                .exists()
                .withMessage('El paramatro Dos es requerido')
                .matches(/^[0-9]+$/, "i")
                .withMessage('El parametro Dos debe ser numerico')
                .trim()
                .escape(),
            express_validator_1.body(uage)
                .exists()
                .withMessage('El paramatro Dos es requerido')
                .matches(/^[0-9]+$/, "i")
                .withMessage('El parametro Dos debe ser numerico')
                .trim()
                .escape();
    });
}
exports.validateRegister = validateRegister;
function validateLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uemail, upass } = req.body;
        express_validator_1.body(uemail)
            .exists()
            .withMessage('El paramatro Uno es requerido')
            .matches(/^[0-9]+$/, "i")
            .withMessage('El correo no es valido')
            .trim()
            .escape(),
            express_validator_1.body(upass)
                .exists()
                .withMessage('El paramatro Dos es requerido')
                .matches(/^[0-9]+$/, "i")
                .withMessage('El parametro Dos debe ser numerico')
                .trim()
                .escape();
    });
}
exports.validateLogin = validateLogin;
