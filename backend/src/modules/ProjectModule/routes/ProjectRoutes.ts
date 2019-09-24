import express from 'express'
import { ProjectController } from '../controller/ProjectController';

let router = express.Router();

let Rrojects = new ProjectController();

router.get('/projects', Rrojects.default)
router.get('/projects/id', Rrojects.index)
router.post('/projects/add', Rrojects.add)

export default router
