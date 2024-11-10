import express from 'express';
import { userController } from '../controllers/user.controller.js';

const userRouter = express.Router();

// Tạo route CRUD
userRouter.post('/', userController.create);
userRouter.get('/', userController.findAll);
userRouter.get('/:id', userController.findOne);
userRouter.patch('/:id', userController.update);
userRouter.delete('/:id', userController.remove);

export default userRouter;