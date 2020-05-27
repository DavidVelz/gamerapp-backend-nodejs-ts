const mongoose = require('mongoose');
import {databaseConfig} from '../config/config';

mongoose.connect(databaseConfig.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB is connected'))
    .catch(()=> console.error());