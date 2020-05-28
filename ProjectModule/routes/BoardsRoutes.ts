import express from 'express'
import { BoardsController } from '../controller/BoardsController';

let router = express.Router();

let Boards = new BoardsController();

router.get('/boards/', Boards.getBoardByIdProject)

router.post('/boards/add', Boards.createBoard)

router.post('/boards/init', Boards.init)
router.post('/boards/init/tasks', Boards.addTaskToBoards)

router.post('/boards/replace/task', Boards.replaceTask)


export default router
