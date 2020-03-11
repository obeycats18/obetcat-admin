import express from 'express'
import { ProjectController } from '../controller/ProjectController';

let router = express.Router();

let Rrojects = new ProjectController();

router.get('/projects', Rrojects.default)
router.get('/project', Rrojects.index)

router.post('/projects/add', Rrojects.add)
router.post('/projects/edit', Rrojects.edit)
router.delete('/project', Rrojects.delete)

export default router
