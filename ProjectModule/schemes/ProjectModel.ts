import mongoose, {Schema}  from 'mongoose'
import { Document } from 'mongoose';


export interface IProject extends Document{
    name: string ;
    isDeveloped?: boolean;
    image?: string ;
    cost: number ;
    dateToFinish?: string;
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
        type: Boolean,
        default: true
    },
    cost: {
        type: Number,
        default: 0
    },
    dateToFinish: {
        type: String
    },
    procentComplete: {
        type: Number,
        default: 0
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: "Teams"
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    milestones: {
        type: Schema.Types.ObjectId,
        ref: 'Milestones' 
    },
    optimization: {
        type: Schema.Types.ObjectId,
        ref: 'Optimization'
    }
})



