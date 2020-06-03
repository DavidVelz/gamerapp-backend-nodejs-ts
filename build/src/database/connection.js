"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const config_1 = require("../config/config");
mongoose.connect(config_1.env.uridb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Base de datos inicializada'))
    .catch(() => console.error());
