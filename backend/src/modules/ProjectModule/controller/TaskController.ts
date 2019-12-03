import express from 'express'
import {TaskModel} from "../models/models";
import {update, findOne, findById, find} from "../../../db/queries/queries";
import { handleError } from '../../../middlewares/errorHandling/errorHandling';
import mongoose from 'mongoose'

import {reduce} from 'lodash'

export class TaskController {

    index(req: express.Request, res: express.Response) {
        let id = req.body.id; // set ID
        findById(TaskModel, id)
            .populate('tasks')
            .exec()
            .then(( taskSet) => {
                if (!taskSet) {
                    return res.json({
                        status: 404,
                        message: 'Set tasks not found'
                    })
                }

                return res.json({
                    status: 200,
                    taskSet
                })
            })
            .catch (err => {
                return handleError( {message: err.message, status: 500}, res)
            })
    }

    add(req: express.Request, res: express.Response) {
        let postData = {
            idProject: req.body.idProject,
            set: [] as Array<Object>
        };

        let tasksReq = {
            idMilestone: req.body.idMilestone,
            tasks: [] as Array<Object>
        };

        findOne(TaskModel, {idProject: postData.idProject}, (err, set) => {
            if(!set) {
                console.log(req.body.tasks)
                tasksReq.tasks = req.body.tasks.map((item:string) => item);
                postData.set.push(tasksReq);
                new TaskModel(postData).save( (err) => {
                    if(err){
                        return handleError( {message: err.message, status: 500}, res)
                    }

                    return res.json({
                        status: 200,
                        tasks: set.task
                    })

                })
            }
            else{
                
                findOne(TaskModel, {"set.idMilestone": tasksReq.idMilestone}, (err, milestoneSet) => {
                    if(!milestoneSet) {
                        
                        tasksReq.tasks = req.body.tasks.map((item:string) => item);
                        
                        update(TaskModel, {idProject: postData.idProject}, {"$push": {set: tasksReq}}, (err, set) => {
                            if(err){
                                return handleError( {message: err.message, status: 500}, res)
                            }else{
                                return res.json({
                                    status: 200,
                                    set
                                })
                            }
                        })

                        
                    }else{
                        tasksReq.tasks = req.body.tasks.map((item:string) => item);
                        update(TaskModel, {"set.idMilestone": tasksReq.idMilestone}, {"$push": {'set.$.tasks': tasksReq.tasks}}, (err, set) => {
                            if(err){
                                return handleError( {message: err.message, status: 500}, res)
                            }else{
                                return res.json({
                                    status: 200,
                                    set
                                })
                            }
                        })
                        // findOne(TaskModel, {"set.idMilestone": tasksReq.idMilestone}, (err, milestoneSet) => {
                        //     milestoneSet.set.tasks = req.body.tasks.map((item:string) => item);
                        //     milestoneSet.save();
                        //     return res.json({
                        //         status: 200,
                        //         milestoneSet
                        //     })
                        // } )
                        
                    }
                })

            }
        })
    }


    async edit (req: express.Request, res: express.Response) {
        
        let idMilestone = req.body.idMilestone;
        let task = req.body.task;

        let doc = await TaskModel.findOne({'set.tasks._id': new mongoose.Types.ObjectId(task._id)}).then((doc:any) => doc) 
        
        doc._doc.set.forEach((item:any) => {
            item.tasks.forEach((element:any) => {
                if(`${element._id}` === task._id) {
                   reduce(task, (result:any, value:any, key:any) => {
                        console.log(value, key)
                        if(key !== '_id'){
                            element[key] = task[key] 
                        }
                        return result
                    }, {})
                }
            })
        })

        try{
            doc.save( (doc:any) => {
                return res.json({
                    message: 200,
                    doc
                })
            })
        }catch(err) {
            handleError( {message: err.message, status: 500}, res)
        }
        

    }
}