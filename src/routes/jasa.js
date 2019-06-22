import express from 'express';
import JasaController from '../controllers/jasa';
import { StoreValidator } from '../middlewares/validators/jasa';

const routes = express.Router();

routes.post('/', StoreValidator.validate(), JasaController.store);
routes.put('/:id', StoreValidator.validate(), JasaController.update);
routes.delete('/:id', JasaController.delete);
routes.get('/single/:id', JasaController.single);
routes.get('/count', JasaController.count);
routes.get('/:limit?', JasaController.index);

export default routes;