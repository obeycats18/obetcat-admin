import express from 'express'
import {MilestoneModel, ProjectModel, TaskModel} from "../models/models";
import {checkIsExisted} from "../../../helper/checkIsExisted";
import {update} from "../queries/update";
import flatten = require("flat");

export class TaskController {

    index(req: express.Request, res: express.Response) {
        let id = req.body.id; // set ID
        TaskModel.findById(id)
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

        TaskModel.findOne({idProject: postData.idProject}, (err, set: any) => {
            if(!set){
                tasksReq.tasks.push(taskData);
                postData.set.push(tasksReq);
                new TaskModel(postData).save( (err, set) => {
                    if(err) {
                        return res.json({
                            status: 500,
                            err
                        })
                    }

                    return res.json({
                        status: 200,
                        message: 'Sucssesfully!',
                        set
                    })
                })
            }else{

                //TODO  Create findOneAndUpdate method for Task

                // update(TaskModel, {'idProject': postData.idProject}, '$push', {"set.tasks": taskData},
                //     (set) => {
                //         return res.json({
                //             status: 200,
                //             message: 'Sucssesfully!',
                //             id: set
                //         })
                //     })
                TaskModel.findOneAndUpdate({'set.idMilestone': tasksReq.idMilestone},
                    {'$push': {tasks: tasksReq} },
                    {"new": true, "upsert": true},
                    (err, set) => {

                                if(err) {
                                    return res.json({
                                        status: 500,
                                        err
                                    })
                                }

                                return res.json({
                                    status: 200,
                                    message: 'Sucssesfully!',
                                    id: set
                                })
                            }
                )
            }
        })
    }
}

