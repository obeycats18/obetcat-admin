import mongoose, {Schema}  from 'mongoose'
import { Document } from 'mongoose';


// export interface IUser extends Document{
//     fullname: string ;
//     email: string;
//     password: string ;
//     role: string ;
// }

export let HistoryShema = new Schema({
    text: {
        type: String,
        default: ''
    },
    finishDate: {
        type: Date,
        required: [true, 'isFinished is required!'],
        default: Date.now
    },
    millestone: {
        type: mongoose.Schema.Types.ObjectId
    }
})




