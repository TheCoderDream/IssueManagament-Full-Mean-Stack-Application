const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const issueRoutes = require('./routes/issue');
const authRoutes = require('./routes/auth');

app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((req, res , next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers',
        'Content-Type, Authorization');
    next();
});

app.use('/issues',issueRoutes);
app.use('/auth', authRoutes);

// error handler

app.use((err, req, res ,next ) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data || null;

    res.status(status).json({ message, data});
});

mongoose.connect('mongodb://localhost/issues', { useNewUrlParser: true })
    .then(result => {
        console.log('succesfully started');
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    });

