import mongoose, {Schema}  from 'mongoose'
import { Document } from 'mongoose';
import { TaskModel } from '../models/models';


// export interface IUser extends Document{
//     fullname: string ;
//     email: string;
//     password: string ;
//     role: string ;
// }

let MilestoneShema = new Schema({
    name: {
        type: String,
        required: [true, 'Milestone name is required!']
    },
    isDeveloped: {
        type: Boolean,
        required: [true, 'isDeveloped is required!']
    },
    isNoReturn: {
        type: Boolean,
        required: [true, 'isNoReturn is required!']
    },
    dateToFinish: {
        type: Date,
        required: [true, 'Date To Finish is required!']
    },
    procentComplete: {
        type: Number
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId
    },
    // task: [TaskModel]
})


export let MilestoneModel = mongoose.model('Milestones', MilestoneShema);

