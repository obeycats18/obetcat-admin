import mongoose, {Schema}  from 'mongoose'


// export interface IUser extends Document{
//     fullname: string ;
//     email: string;
//     password: string ;
//     role: string ;
// }

export let MilestoneShema = new Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    }
    // task: [TaskModel],
    // edits: [EditsModel],
    // history: [HistoryModel]
})


