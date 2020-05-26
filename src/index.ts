import express from 'express';
import gamersrouter from './server/router'
import {server} from './config/config'

//Inicializar el servidor
const app = express();

//config
app.set('port', process.env.PORT || server.port);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(gamersrouter);

// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port`, server.port);
});