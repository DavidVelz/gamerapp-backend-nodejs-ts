import express from 'express';
import gameController from './routers/game.router';
import userController from './routers/user.router';
import { env } from './config/config';
require('./database/connection');
import path from 'path';
import cors from 'cors';
//const formidableMiddleware = require('express-formidable');
//const formData = require("express-form-data");
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
//Inicializar el servidor
const app = express();

//config
app.set('port', env.port || 4000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(multipartMiddleware);
//app.use(formidableMiddleware());
//app.use(formData.parse());
//app.use(bodyParser.json());
// Routes
app.use(userController);
app.use(gameController);

// Static files
app.use('/uploads', express.static(path.resolve('uploads')));

// Inicializar el servidor
app.listen(app.get('port'), () => { });