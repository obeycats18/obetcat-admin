import express from 'express'
import { ProjectController } from '../controller/ProjectController';

let router = express.Router();

let Project = new ProjectController();

router.get('/projects', Project.default)
router.get('/project', Project.index)

router.post('/projects/add', Project.add)
router.post('/projects/edit', Project.edit)
router.delete('/project', Project.delete)

export default router
