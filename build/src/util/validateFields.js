"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const regex_1 = require("./regex");
require("express-validator");
function validateEmail(username) {
    return express_validator_1.body(username)
        .exists()
        .withMessage('El paramatro email es requerido')
        .matches(regex_1.regexFields.email, "i")
        .withMessage('El email no es valido')
        .trim()
        .escape();
}
exports.default = validateEmail;
