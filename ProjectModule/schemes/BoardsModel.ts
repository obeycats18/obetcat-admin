import mongoose, {Schema}  from 'mongoose'

import { Task } from '../schemes/TaskModel';

export const BoardsSchema = new Schema({
    idProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    },
    boards: [
        {
            name: {
                type: String
            },
            tasks: [{} as Task]
        }
    ]
});



