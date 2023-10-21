const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(bodyParser.json());
const photoRoutes = require('./routes/photoRoutes.js');
app.use('/world', photoRoutes);



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movies',
    password: 'password',
    port: 5432,
});

const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/movies', movieRoutes);
app.use('/users', userRoutes);
const options = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'Users API',
            version: '0.1.0',
            description:
            'API for accessing Users and movie data',
        },
        servers: [
            {
              url: 'http://localhost:3000',
            },
          ],
    },
    apis: ['./routes/*js']
};


app.listen(3000);
