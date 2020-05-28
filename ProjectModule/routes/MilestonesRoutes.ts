import express from 'express'
import { MilestonesController } from '../controller/MilestonesController';

let router = express.Router();

let Milestones = new MilestonesController();

router.get('/milestones', Milestones.index)
router.post('/milestone/add', Milestones.add)
router.put('/milestone/edit', Milestones.edit)

export default router
