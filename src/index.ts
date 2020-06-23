import express from 'express';
import gameController from './routers/game.router';
import userController from './routers/user.router';
import { env } from './config/config';
require('./database/connection');
import path from 'path';
import cors from 'cors';

//Inicializar el servidor
const app = express();

//config
app.set('port', env.port || 4000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(userController);
app.use(gameController);

// Static files
app.use('/uploads', express.static(path.resolve('uploads')));

// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto`, env.port || 4000);
});