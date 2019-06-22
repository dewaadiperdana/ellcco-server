import { Router } from 'express';
import { LoginValidator } from '../middlewares/validators/admin';
import AdminController from '../controllers/admin';

const routes = Router();

routes.post('/login', LoginValidator.validate(), AdminController.login);
routes.post('/is-authenticated', AdminController.isAuthenticated);
routes.post('/auth', AdminController.getAuthData);

export default routes;