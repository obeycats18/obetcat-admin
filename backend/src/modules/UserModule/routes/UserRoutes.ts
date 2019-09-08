import express from 'express'
import { UserController } from '../controller/UserController';

let router = express.Router();

let User = new UserController()

router.get('/', User.index)
router.delete('/delete', User.deleteUser)
router.post('/registration', User.addUser)



export default router
