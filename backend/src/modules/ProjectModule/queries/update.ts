 import express from "express";


export let update = (Model:any, params:Object, actionType: string, action:Object, callback: (set:any) => express.Response) => {
    Model.findOneAndUpdate(params,
        {actionType: action},
        {"new": true, "upsert": true},
        )
        .then( callback )
};