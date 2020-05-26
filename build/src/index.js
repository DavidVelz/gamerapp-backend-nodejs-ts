"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Inicializar el servidor
const ex = express_1.default();
//config
ex.set('port', process.env.PORT || 4000);
// middlewares
ex.use(express_1.default.json());
// Routes
ex.use('/');
// Inicializar el servidor
ex.listen(ex.get('port'), () => {
    console.log(`Server on port`, ex.get('port'));
});
