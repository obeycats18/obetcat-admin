// import { TasksSchema } from './TaskModel';
import mongoose, {Schema, Document}  from 'mongoose'

export interface DocumentTasks extends Document {
    idProject: string
    tasks: Array<Task> | []
}

export interface Task extends Document {
    text: string
    status?: string
    description?: string
    developer?: string
    cost?: number
    priority?: number
    backlog?: boolean
}

let SubTaskSchema: Schema = new Schema({
    
})

export let TaskSchema: Schema = new Schema({
    idProject: {
        type: Schema.Types.ObjectId,
        ref: 'Projects'
    },
    tasks: [{
        text: {
            type: String,
            required: [true, 'Text for task is required!'],
            max: 100
        },
        status: {
            type: String,
            default: "Todo"
        },
        description: {
            type: String,
            max: 200
        },
        developer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        cost: {
            type: Number,
            default: 0
        },
        priority: {
            type: Number,
            default: 1
        },
        backlog: {
            type: Boolean,
            default: true
        }
    }]
});



