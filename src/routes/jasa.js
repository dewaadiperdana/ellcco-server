import express from 'express';
import JasaController from '../controllers/jasa';
import { StoreValidator } from '../middlewares/validators/jasa';

const routes = express.Router();

routes.get('/:limit?', JasaController.index);
routes.post('/', StoreValidator.validate(), JasaController.store);
routes.put('/:id', StoreValidator.validate(), JasaController.update);
routes.delete('/:id', JasaController.delete);

export default routes;