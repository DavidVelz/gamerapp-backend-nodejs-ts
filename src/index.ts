import express from 'express';
import gamersrouter from './server/router'
import { serverConfig } from './config/config'
require('./database/connection');


//Inicializar el servidor
const app = express();

//config
app.set('port', process.env.PORT || serverConfig.port);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(gamersrouter);

// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port`, serverConfig.port);
});