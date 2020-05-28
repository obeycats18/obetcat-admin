import mongoose, {Schema, Document}  from 'mongoose'

import { Task, DocumentTasks } from '../schemes/TaskModel';

export interface DMilestone extends Document{
    idProject: string
    milestones: Array<Milestone>
}

export interface Milestone extends Document{
    name: string 
    isDevelop: boolean
    isNoReturn: boolean 
    dataToFinish: Date 
    procentComplete: number 
    tasks: Array<Task>
}

export let MilestoneShema: Schema = new Schema({
    idProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    },
    milestones: [{
        name: {
            type: String,
            required: [true, 'Milestone name is required!']
        },
        isDevelop: {
            type: Boolean,
            default: true
        },
        isNoReturn: {
            type: Boolean,
            default: false
        },
        date: {
            type: String
        },
        procentComplete: {
            type: Number,
            default: 0
        },
        tasks: [ {} as Task ], //
    }],

    // edits: [EditsModel],
    // history: [HistoryModel]
})


