import express from 'express'
import { UserController } from '../controller/UserController';

let router = express.Router();

let User = new UserController()

router.get('/', User.index)
router.delete('/delete', User.delete)
router.get('/me', User.getMe)

export default router
