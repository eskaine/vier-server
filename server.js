require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const passport = require('./configs/passport.config');
const expsession = require('./configs/session.config');
const socket = require('./helpers/socket');
const path = require('path');

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require('./configs/mongo.config');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('dist'));
app.use(express.json());
app.use(expsession());
app.use(passport.initialize());
app.use(passport.session());
socket(io);

app.use('/api', require('./routes/index.routes'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  // app.use(express.static(path.join(__dirname, 'dist')));
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
