//Objeto de configuración del servidor
export const serverConfig = {
    port: "3400"
}

//Objeto de configuración de la base de datos
export const databaseConfig = {
    URI: "mongodb://localhost/gamersappdb"
}

export const Routers = {
    login: "/login",
    register: "/register",
    games: "/games",
    ugames: "/ugames/:uid",
    user: "/user/:id",
    gamecreate: "/gamecreate",
    gameid: "/game/:id",
    gamedelete: "/gamedelete/:id",
    gameupdate: "/gameupdate/:id",

}
