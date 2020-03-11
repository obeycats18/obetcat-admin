import express from 'express'
import { BoardsController } from '../controller/BoardsController';

let router = express.Router();

let Boards = new BoardsController();

router.get('/boards/', Boards.default)
router.post('/boards/add', Boards.add)

export default router
