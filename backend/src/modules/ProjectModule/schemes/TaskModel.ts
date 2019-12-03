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
            }
        }]
    }]
});



