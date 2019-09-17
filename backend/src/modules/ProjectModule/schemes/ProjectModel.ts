import mongoose, {Schema}  from 'mongoose'
import { Document } from 'mongoose';
import { MilestoneModel } from '../models/models';


// export interface IUser extends Document{
//     fullname: string ;
//     email: string;
//     password: string ;
//     role: string ;
// }

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
    owner: {
        type: Schema.Types.ObjectId
    },
    // milestones: [MilestoneModel]
})



