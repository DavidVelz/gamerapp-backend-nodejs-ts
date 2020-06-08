import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import gamersrouter from './server/router';
import { env } from './config/config';
require('./database/connection');
import path from 'path';

//Inicializar el servidor
const app = express();

//config
app.set('port', env.port || 4000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// Routes
app.use(gamersrouter);

// Static files
app.use(express.static(path.join(__dirname, 'uploads')));
// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port`, env.port || 4000);
});