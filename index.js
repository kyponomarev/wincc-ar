const express = require('express');
const fs = require('fs');
const spdy = require('spdy');
const wincc = require('./wincc');

const app = express();
const credentials = {
    key: fs.readFileSync('certs/server.key', 'utf8'),
    cert: fs.readFileSync('certs/server.crt', 'utf8')
};
const httpsServer = spdy.createServer(credentials, app);
const io = require('socket.io')(httpsServer);


app.use(express.static('public'));
app.get('/api/charts', (req, res) => {
    res.sendfile('mock/data.json');
});


wincc(io, 2000);
httpsServer.listen(443);

