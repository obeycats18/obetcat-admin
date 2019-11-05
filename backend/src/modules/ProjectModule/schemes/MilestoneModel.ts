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
        milestoneName: {
            type: String,
            required: [true, 'Milestone name is required!']
        },
        milestoneIsDeveloped: {
            type: Boolean
        },
        isNoReturn: {
            type: Boolean,
            required: [true, 'isNoReturn is required!']
        },
        milestoneDate: {
            type: String
        },
        procentComplete: {
            type: Number
        },
        developers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tasks'
        }],
    }],

    // edits: [EditsModel],
    // history: [HistoryModel]
})


