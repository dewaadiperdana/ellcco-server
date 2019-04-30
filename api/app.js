import config from 'dotenv';
import express from 'express';
import LayananRoutes from './server/routes/LayananRoutes';

config.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/layanan', LayananRoutes);

app.get('/', (req, res) => {
  res.send('eLconics is comming to help you.');
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

export default app;
