import { Router } from 'express';
import LayananController from '../controller/LayananController';
import {
  AddLayananValidator,
  UpdateLayananValidator,
  DeleteLayananValidator
} from '../validators/layanan';

const router = Router();

router.get('/:limit?', LayananController.getAllLayanan);
router.post('/', AddLayananValidator.validate() , LayananController.addLayanan);
router.put('/', UpdateLayananValidator.validate(), LayananController.updateLayanan);
router.delete('/', DeleteLayananValidator.validate(), LayananController.deleteLayanan);

export default router;