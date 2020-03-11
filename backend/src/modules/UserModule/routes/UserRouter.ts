import express from 'express'
import { UserController } from '../controller/UserController';

let router = express.Router();

let User = new UserController()

router.get('/user', User.index)
router.delete('/user/delete', User.delete)
router.get('/user/me', User.getMe)

export default router
