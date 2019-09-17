import mongoose, {Schema}  from 'mongoose'
import { Document } from 'mongoose';


// export interface IUser extends Document{
//     fullname: string ;
//     email: string;
//     password: string ;
//     role: string ;
// }

export let TaskSchema = new Schema({
    text: {
        type: String,
        default: ''
    },
    isFinished: {
        type: Boolean,
        required: [true, 'isFinished is required!']
    },
    millestone: {
        type: mongoose.Schema.Types.ObjectId
    }
})



