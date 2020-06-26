"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_router_1 = __importDefault(require("./routers/game.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const config_1 = require("./config/config");
require('./database/connection');
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
//const formidableMiddleware = require('express-formidable');
const formData = require("express-form-data");
//Inicializar el servidor
const app = express_1.default();
//config
app.set('port', config_1.env.port || 4000);
// middlewares
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//app.use(formidableMiddleware());
app.use(formData.parse());
// Routes
app.use(user_router_1.default);
app.use(game_router_1.default);
// Static files
app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
// Inicializar el servidor
app.listen(app.get('port'), () => { });
