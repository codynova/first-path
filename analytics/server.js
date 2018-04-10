require('dotenv').config();
const express = require('express');
const postgres = require('pg');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const environmentVariables = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5432,
    database: process.env.DATABASE || 'firstpath',
    user: process.env.USER || '',
    password: process.env.PASSWORD || '',
    max: process.env.MAX_CLIENTS_IN_POOL || 25,
    idleTimeoutMillis: process.env.IDLE_TIMEOUT || 30000,
    connectionTimeoutMillis: process.env.CONNECT_TIMEOUT || 30000
};

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//app.use(express.static('public'));


let connect = async () => {
    const client = await pool.connect();
    await client.query('SELECT NOW()', async (err, res) => {
        await console.log('\nLOG: \n', err, res, '\n');
        //await pool.end();
    });
    client.release()
};
const pool = new postgres.Pool(process.env);
connect();


require('./routes/routes.js')(app);
const server = app.listen(environmentVariables.port, () => {
    console.log(`FirstPath Analytics Server running at ${environmentVariables.host+':'+environmentVariables.port}!`);
});
server.timeout = environmentVariables.idleTimeoutMillis;