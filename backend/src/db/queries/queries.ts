import express from "express";
import mongoose, { DocumentQuery } from "mongoose";

export let update = (Model:mongoose.Model<any>, query:Object, action: Object, callback: (err:any, set:any) => express.Response) => {
    
    Model.findOneAndUpdate(
        query, 
        action,
        {"new": true, "upsert": true},
        callback
    )
};

export let findOne = (Model:mongoose.Model<any>, query:Object, callback?: (err:any, set:any) => void) => {
    Model.findOne(query, callback)
}

export let findById = (Model:mongoose.Model<any>, id:string, callback?: (err:any, set:any) => void):DocumentQuery<any | null, any> => {
    return Model.findById(id)
}

export let find = (Model:mongoose.Model<any>, query:Object, callback?: (err:any, set:any) => void):DocumentQuery<any | null, any> => {
    return Model.find(query)
}

export let findByIdAndUpdate = (Model:mongoose.Model<any>, id:string, action:Object, callback?: (err:any, set:any) => void) => {
    Model.findByIdAndUpdate(id, 
        action,
        {"new": true, "upsert": true},
        callback
    )
}

export let findByIdAndRemove = (Model:mongoose.Model<any>, id:string, callback?: (err:any, set:any) => void):DocumentQuery<any | null, any> => {
    return Model.findByIdAndRemove(id)
}