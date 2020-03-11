import express from 'express'
import { AuthController } from '../controller/AuthController';

let router = express.Router();

let Auth = new AuthController()

router.post('/registration', Auth.createUser)
router.post('/login', Auth.login)


export default router;