import mongoose, {Schema}  from 'mongoose'
import { Document } from 'mongoose';


// export interface IUser extends Document{
//     fullname: string ;
//     email: string;
//     password: string ;
//     role: string ;
// }

export let EditsShema = new Schema({
    text: {
        type: String,
        default: ''
    },
    millestone: {
        type: mongoose.Schema.Types.ObjectId
    }
})



