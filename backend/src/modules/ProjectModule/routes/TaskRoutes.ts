import express from 'express'
import {TaskController} from "../controller/TaskController";

let router = express.Router();

let Tasks = new TaskController();

router.get('/tasks', Tasks.index)
router.post('/tasks/add', Tasks.add)

export default router
