import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'express-handlebars';
import http from 'http';
import * as admin from 'firebase-admin';
import io from 'socket.io';

import Socket from './sockets/Socket';

import firebaseAdminConfig from './config/firebase';

// Application Routes
import LayananRoutes from './routes/LayananRoutes';
import PenggunaRoutes from './routes/PenggunaRoutes';
import PesananRoutes from './routes/PesananRoutes';
import NotifikasiRoutes from './routes/NotifikasiRoutes';

dotenv.config();

admin.initializeApp({
	credential: admin.credential.cert(firebaseAdminConfig),
	databaseURL: process.env.FIREBASE_DB_URL
});

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const socket = io(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/server/views/layouts/',
  partialsDir: __dirname + '/server/views/partials/'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/pengguna', PenggunaRoutes);
app.use('/api/layanan', LayananRoutes);
app.use('/api/pesanan', PesananRoutes);
app.use('/api/notifikasi', NotifikasiRoutes);

app.get('/', (req, res) => {
  res.send('Ellcco is on development');
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

socket.on('connection', Socket.init);

export {
  app,
  server,
  admin,
  socket
};