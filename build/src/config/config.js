"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = exports.Routers = exports.databaseConfig = exports.serverConfig = void 0;
//Objeto de configuración del servidor
exports.serverConfig = {
    port: "3400"
};
//Objeto de configuración de la base de datos
exports.databaseConfig = {
    URI: "mongodb://localhost/gamersappdb"
};
exports.Routers = {
    login: "/login",
    register: "/register",
    games: "/games",
    ugames: "/ugames",
    user: "/user",
    gamecreate: "/creategame",
    gameid: "/game",
    gamedelete: "/deletegame",
    gameupdate: "/updategame",
};
exports.secret = {
    secret: 'usersecret'
};
