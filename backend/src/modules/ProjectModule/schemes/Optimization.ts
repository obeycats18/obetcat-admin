import mongoose, {Schema}  from 'mongoose'
import { Document } from 'mongoose';


export interface IOptimization extends Document{
   
}

export let ProjectSchema = new Schema({
    idProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    },
    loadingScore: {
        performanceScore: {
            type: Number,
            required: [true, 'Performance Score is required!']
        },
        interactive: {
            type: Number,
            required: [true, 'Time to interactive is required!']
        },
        firstContentfulPaint: {
            type: Number,
            required: [true, 'First Contentful Paint is required!']
        },
        firstMeaningfulPaint:{
            type: Number,
            required: [true, 'First Meaningful Paint is required!']
        }
    }
    
})



