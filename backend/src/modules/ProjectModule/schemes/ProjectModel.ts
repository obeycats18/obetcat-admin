import mongoose, {Schema}  from 'mongoose'
import { Document } from 'mongoose';


export interface IProject extends Document{
    name: string ;
    isDeveloped?: boolean;
    image?: string ;
    cost: number ;
    dateToFinish: string;
    procentComplete?: number
    owner: [{
        type: Schema.Types.ObjectId,
        ref: string
    }];
    milestones?: [{
        type: Schema.Types.ObjectId,
        ref: string
    }];
}

export let ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Project name is required!']
    },
    isDeveloped: {
        type: Boolean
    },
    image: {
        type: String,
    },
    cost: {
        type: Number
    },
    dateToFinish: {
        type: String,
        required: [true, 'Date To Finish is required!']
    },
    procentComplete: {
        type: Number
    },
    owner: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    milestones: [{
        type: Schema.Types.ObjectId,
        ref: 'Milestones' 
    }]
})



