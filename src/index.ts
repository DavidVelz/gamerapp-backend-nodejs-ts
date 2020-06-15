import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import gamersrouter from './server/router';
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
app.use(gamersrouter);

// Static files
app.use('/uploads', express.static(path.resolve('uploads')));

app.use(function (err:any, req:any, res:any, next:any) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port`, env.port || 4000);
});