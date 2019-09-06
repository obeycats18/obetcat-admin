import express from 'express'
import { UserController } from '../controller/UserController';

let router = express.Router();

router.get('/', new UserController().index)
router.delete('/:id', new UserController().deleteUser)


export default router
