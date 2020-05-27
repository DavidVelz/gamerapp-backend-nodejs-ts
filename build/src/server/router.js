"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class GamersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/login', (req, res, next) => {
            res.json({
                text: 'login'
            });
        });
        this.router.get('/', (req, res, next) => {
            res.json({
                text: 'home'
            });
        });
        this.router.get('/profile', (req, res, next) => {
            res.json({
                text: 'profile'
            });
        });
    }
}
const gamersroutes = new GamersRoutes();
exports.default = gamersroutes.router;
