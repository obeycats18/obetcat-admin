import express from 'express'
import {TaskModel} from "../models/models";
import {update, findOne, findById} from "../../../db/queries/queries";

export class TaskController {

    index(req: express.Request, res: express.Response) {
        let id = req.body.id; // set ID
        // TaskModel.findById(id)
        findById(TaskModel, id)
            .populate('tasks')
            .exec((err, taskSet) => {
                if (err) {
                    return res.json({
                        status: 404,
                        message: 'Projects not found'
                    })
                }

                return res.json({
                    status: 200,
                    taskSet
                })
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

        let taskData = {
            text: req.body.text
        };

        // findOne(TaskModel, {idProject: postData.idProject}, )

        findOne(TaskModel, {idProject: postData.idProject}, (err, set) => {
            if(!set) {
                tasksReq.tasks.push(taskData);
                postData.set.push(tasksReq);
                new TaskModel(postData).save( (err, taskSet) => {
                    if(err){
                        return res.json({
                            status: 500,
                            err
                        })
                    }

                    return res.json({
                        status: 200,
                        taskSet
                    })

                })
            }
            else{

                findOne(TaskModel, {"set.idMilestone": tasksReq.idMilestone}, (err, milestoneSet) => {
                    if(!milestoneSet) {
                        
                        tasksReq.tasks.push(taskData);
                        
                        update(TaskModel, {idProject: postData.idProject}, {"$push": {set: tasksReq}}, (err, set) => {
                            if(err){
                                return res.json({
                                    status: 500,
                                    err
                                })
                            }else{
                                return res.json({
                                    status: 200,
                                    set
                                })
                            }
                        })

                        
                    }else{

                        update(TaskModel, {"set.idMilestone": tasksReq.idMilestone}, {"$push": {'set.$.tasks': taskData}}, (err, set) => {
                            if(err){
                                return res.json({
                                    status: 500,
                                    err
                                })
                            }else{
                                return res.json({
                                    status: 200,
                                    set
                                })
                            }
                        })

                    }
                })

            }
        })
    }
}

