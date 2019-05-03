import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'express-handlebars';
import http from 'http';
import io from 'socket.io';
import * as admin from 'firebase-admin';
import firebaseAdminConfig from '../firebase-admin-config';

// Application Routes
import LayananRoutes from './server/routes/LayananRoutes';
import PenggunaRoutes from './server/routes/PenggunaRoutes';
import PesananRoutes from './server/routes/PesananRoutes';

dotenv.config();

admin.initializeApp({
	credential: admin.credential.cert(firebaseAdminConfig),
	databaseURL: process.env.FIREBASE_DB_URL
});

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
io(server);

app.set('view engine', 'hbs');

app.engine('hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/server/src/views/layouts/',
  partialsDir: __dirname + '/server/src/views/partials/'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/pengguna', PenggunaRoutes);
app.use('/api/layanan', LayananRoutes);
app.use('/api/pesanan', PesananRoutes);

app.get('/', (req, res) => {
  res.send('eLconics is comming to help you.');
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

export {
  app,
  io,
  server
};