const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api' , require('./routes/index'));
app.use('/admin' , require('./routes/admin'));
app.use('/user', require('./routes/Usuario'));
module.exports = app;