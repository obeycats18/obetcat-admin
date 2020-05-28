import mongoose, {Schema}  from 'mongoose'
import { Document } from 'mongoose';


export const BacklogSchema = new Schema({
    idProject: {
        type: Schema.Types.ObjectId,
        ref: 'Projects'
    },
    set: [{
        tasks: [{
            text: {
                type: String,
                required: [true, 'Text for task is required!'],
                max: 100
            },
            status: {
                type: String
            },
            description: {
                type: String,
                max: 200
            },
            developer: {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            },
            cost: {
                type: Number
            },
            priority: {
                type: Number
            },
            
        }]
    }]
});



