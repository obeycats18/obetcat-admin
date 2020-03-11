import express from 'express'
import {TaskModel} from "../models/models";
import {update, findOne, findById, find} from "../../../db/queries/queries";
import { handleError } from '../../../middlewares/errorHandling/errorHandling';
import mongoose from 'mongoose'

import {reduce} from 'lodash'

export class TaskController {


    default(req: express.Request, res: express.Response) {
        
        find(TaskModel, {})
            .populate('tasks')
            .exec()
            .then(( taskSet) => {
                if (!taskSet) {
                    return res.json({
                        status: 404,
                        message: 'Set tasks not found'
                    })
                }
                taskSet.map((item:any) => console.log(item.set))
                console.log()
                return res.json({
                    status: 200,
                    set:  taskSet.map((item:any) => item.set)
                })
            })
            .catch (err => {
                return handleError( {message: err.message, status: 500}, res)
            })
    }

    async index(req: express.Request, res: express.Response) {
        try{
            let idProject = req.query.id; // set ID
            let doc:any = await TaskModel.findOne({idProject})

            if(!doc){
                return res.json({
                    status: 404,
                    message: 'Tasks not found'
                })
            }

            return res.json({
                status: 200,
                idTask: doc._id,
                tasks: doc.tasks
            }) 
        }
        catch (err) {
            return handleError( {message: err.message, status: 500}, res)
        }
    }

    add(req: express.Request, res: express.Response) {
        let postData = {
            idProject: req.body.idProject,
            tasks: [] as Array<Object>
        };

        // let tasksReq = {
        //     idMilestone: req.body.idMilestone,
        // };

        // TODO: Overwritting

        findOne(TaskModel, {idProject: postData.idProject}, (err, set) => {
            if(!set) {
                postData.tasks = req.body.tasks.map((item:string) => item);
                
                new TaskModel(postData).save( (err) => {
                    if(err){
                        return handleError( {message: err.message, status: 500}, res)
                    }

                    return res.json({
                        status: 200,
                        message: "Success"
                    })

                })
            }
            else{

                postData.tasks = req.body.tasks.map((item:string) => item);
                        
                update(TaskModel, {idProject: postData.idProject}, {"$push": {tasks: postData.tasks}}, (err, set) => {
                    if(err){
                        return handleError( {message: err.message, status: 500}, res)
                    }else{
                        return res.json({
                            status: 200,
                            message: 'Success'
                        })
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