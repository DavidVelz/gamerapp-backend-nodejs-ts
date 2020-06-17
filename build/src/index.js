"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./server/router"));
const config_1 = require("./config/config");
require('./database/connection');
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
//Inicializar el servidor
const app = express_1.default();
//config
app.set('port', config_1.env.port || 4000);
// middlewares
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use(router_1.default);
// Static files
app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port`, config_1.env.port || 4000);
});
