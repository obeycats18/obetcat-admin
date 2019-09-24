import mongoose, {Schema}  from 'mongoose'


// export interface IMilestone extends Document{
//     name: string ;
//     isDevelop: boolean;
//     isNoReturn: boolean ;
//     dataToFinish: Date ;
//     procentComplete: number ;
//     developer:
// }

export let MilestoneShema = new Schema({
    idProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    },
    milestones: [{
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
        }
    }]
    // task: [TaskModel],
    // edits: [EditsModel],
    // history: [HistoryModel]
})


