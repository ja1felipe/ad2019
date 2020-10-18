import { Router } from 'express';
import Controler from '../controllers/UserController';
const router = Router();

router.post('/', Controler.store);
router.get('/', Controler.getAll);
router.put('/:id', Controler.update);
router.get('/:id', Controler.index);
router.delete('/:id', Controler.delete);
router.post('/shuffle', Controler.shuffle);

export default router;
