import mongoose from 'mongoose'

import { HistoryShema } from '../schemes/HistoryModel';
import { MilestoneShema, DMilestone } from '../schemes/MilestoneModel';
import { ProjectSchema, IProject } from '../schemes/ProjectModel';
import { EditsShema } from '../schemes/EditsModel';
import { TaskSchema, DocumentTasks } from '../schemes/TaskModel';
import { BoardsSchema } from '../schemes/BoardsModel';


export let ProjectModel = mongoose.model<IProject>('Projects', ProjectSchema);
export let HistoryModel = mongoose.model('History', HistoryShema);
export let MilestoneModel = mongoose.model<DMilestone>('Milestones', MilestoneShema);
export let EditsModel = mongoose.model('Edits', EditsShema);
export let TaskModel = mongoose.model<DocumentTasks>('Tasks', TaskSchema);
export let BoardsModel = mongoose.model<DocumentTasks>('Boards', BoardsSchema);

