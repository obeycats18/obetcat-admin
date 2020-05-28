import express from 'express'
import {TaskController} from "../controller/TaskController";

let router = express.Router();

let Tasks = new TaskController();

router.get('/tasks', Tasks.index)

router.post('/tasks/add', Tasks.add)
router.post('/tasks/edit', Tasks.edit)

router.get('/devtasks', Tasks.getTaskByDeveloper)


router.get('/backlog', Tasks.getTaskByBacklog)
// router.post('/backlog/edit', Tasks.changeBacklogStatus)


export default router
