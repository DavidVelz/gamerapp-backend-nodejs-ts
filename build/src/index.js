"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./server/router"));
const config_1 = require("./config/config");
//Inicializar el servidor
const app = express_1.default();
//config
app.set('port', process.env.PORT || config_1.serverConfig.port);
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use(router_1.default);
// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port`, config_1.serverConfig.port);
});
