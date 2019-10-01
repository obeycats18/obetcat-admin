import express from 'express'
import { MilestonesController } from '../controller/MilestonesController';

let router = express.Router();

let Milestones = new MilestonesController();

router.get('/milestone/', Milestones.default)
router.post('/milestone/add', Milestones.add)
// router.put('/milestone/edit', Milestones.edit)

export default router
