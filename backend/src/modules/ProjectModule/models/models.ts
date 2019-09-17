import mongoose from 'mongoose'

import { HistoryShema } from '../schemes/HistoryModel';
import { MilestoneShema } from '../schemes/MilestoneModel';
import { ProjectSchema } from '../schemes/ProjectModel';
import { EditsShema } from '../schemes/EditsModel';
import { TaskSchema } from '../schemes/TaskModel';


export let ProjectModel = mongoose.model('Projects', ProjectSchema);
export let HistoryModel = mongoose.model('History', HistoryShema);
export let MilestoneModel = mongoose.model('Milestones', MilestoneShema);
export let EditsModel = mongoose.model('Edits', EditsShema);
export let TaskModel = mongoose.model('Tasks', TaskSchema);
