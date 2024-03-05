const { Client } = require('pg');
//require('dotenv').config();

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ticketing_project',
    password: 'reza123',
    port: '5432',
});

module.exports = db;