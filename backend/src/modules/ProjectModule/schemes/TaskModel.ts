import mongoose, {Schema}  from 'mongoose'
import { Document } from 'mongoose';


// export interface IUser extends Document{
//     fullname: string ;
//     email: string;
//     password: string ;
//     role: string ;
// }

export let TaskSchema = new Schema({
    idProject: {
        type: Schema.Types.ObjectId,
        ref: 'Projects'
    },
    set: [{
        idMilestone: {
            type: Schema.Types.ObjectId,
            ref: 'Milestones'
        },
        tasks: [{
            text: {
                type: String,
                required: [true, 'Text for task is required!']
            },
            isDeveloped: {
                type: Boolean,
                default: false
            },
            dateToFinish: {
                type: String
            }
        }]
    }]
});



