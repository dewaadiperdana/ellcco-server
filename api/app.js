import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'express-handlebars';

import LayananRoutes from './server/routes/LayananRoutes';
import PenggunaRoutes from './server/routes/PenggunaRoutes';

config.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/server/src/views/layouts/',
  partialsDir: __dirname + '/server/src/views/partials/'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/pengguna', PenggunaRoutes);
app.use('/api/layanan', LayananRoutes);

app.get('/', (req, res) => {
  res.send('eLconics is comming to help you.');
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

export default app;
