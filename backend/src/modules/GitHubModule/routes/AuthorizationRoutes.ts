import express from 'express'
import { AuthorizationController } from '../controller/AuthorizationControllers';

let router = express.Router();

let GithubAuth = new AuthorizationController();

router.get('/github/login', GithubAuth.login)

export default router
