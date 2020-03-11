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
        isDevelop: {
            type: Boolean
        },
        isNoReturn: {
            type: Boolean
        },
        date: {
            type: String
        },
        procentComplete: {
            type: Number
        },
        developers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        tasks: [{}],
    }],

    // edits: [EditsModel],
    // history: [HistoryModel]
})


