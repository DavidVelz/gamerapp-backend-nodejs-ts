"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const config_1 = require("../config/config");
mongoose.connect(config_1.databaseConfig.URI, {
    useNewUrlParser: true
})
    .then(() => console.log('DB is connected'))
    .catch(() => console.error());
