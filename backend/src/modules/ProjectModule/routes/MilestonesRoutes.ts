import express from 'express'
import { MilestonesController } from '../controller/MilestonesController';

let router = express.Router();

let Milestones = new MilestonesController();

router.post('/milestone/add', Milestones.add)
router.get('/milestone/', Milestones.default)
// router.put('/milestone/edit', Milestones.edit)

export default router
