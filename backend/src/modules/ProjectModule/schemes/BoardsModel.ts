import mongoose, {Schema}  from 'mongoose'

export const BoardsSchema = new Schema({
    idProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    },
    
    boards: [{
        name: {
            type: String
        },
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tasks'
            
        }]
    }]
});



