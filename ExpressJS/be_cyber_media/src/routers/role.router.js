import express from 'express';
import { roleController } from '../controllers/role.controller.js';

const roleRouter = express.Router();

// Tạo route CRUD
roleRouter.post('/', roleController.create);
roleRouter.get('/', roleController.findAll);
roleRouter.get('/:id', roleController.findOne);
roleRouter.patch('/:id', roleController.update);
roleRouter.delete('/:id', roleController.remove);

roleRouter.post('/toggle-permission', roleController.togglePermission)

export default roleRouter;