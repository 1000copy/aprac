const spdy = require('spdy');
const express = require('express');
const path = require('path');
const fs = require('fs'); 

const app = express();

app.get('/', (req, res) => {
    res.json({foo: 'test'});
});

spdy
    .createServer({
        key: fs.readFileSync(path.resolve(__dirname, './localhost.key')),
        cert: fs.readFileSync(path.resolve(__dirname, './localhost.crt'))
    }, app)
    .listen(8080, (err) => {
        if (err) {
            throw new Error(err);
        }

        /* eslint-disable no-console */
        //console.log('Listening on port: ' + argv.port + '.');
        /* eslint-enable no-console */
    });
