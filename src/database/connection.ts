const mongoose = require('mongoose');
import { env } from '../config/config';

mongoose.connect(env.uridb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Base de datos inicializada'))
    .catch(()=> console.error());