import express from 'express';
import gameController from './routers/game.router';
import userController from './routers/user.router';
import { env } from './config/config';
require('./database/connection');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const xss = require('xss-clean');
import path from 'path';
import cors from 'cors';

//Inicializar el servidor
const app = express();

//Configuración de servidor
app.set('port', env.port || 4000);

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(xss());

// Routes
app.use(userController);
app.use(gameController);

// Archivos estaticos
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/assets', express.static(path.resolve('assets')));
// Inicializar el servidor
app.listen(app.get('port'), () => {});