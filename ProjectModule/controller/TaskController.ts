import express from 'express'
import {TaskModel} from "../models/models";
import { handleError } from '../../../middlewares/errorHandling/errorHandling';
import mongoose from 'mongoose'

import {reduce} from 'lodash'
import { Task, DocumentTasks } from '../schemes/TaskModel';

export class TaskController {

    async index(req: express.Request, res: express.Response) {
        try{
            let idProject = req.query.idProject; 
            let doc = await TaskModel.findOne({idProject}).populate({path:"tasks.developer", model: 'User'}).exec()

            if(!doc){
                return res.json({
                    status: 404,
                    message: 'Tasks not found'
                })
            }

            return res.json({
                status: 200,
                tasks: doc.tasks.filter((task:Task) => !task.backlog)
            }) 
        }
        catch (err) {
            return handleError( {message: err.message, status: 500}, res)
        }
    }

    async getTaskByDeveloper(req: express.Request, res: express.Response) {
        try{
            let user = req.user._id;
            let docs = await TaskModel.find({"tasks.developer": user}).populate({path:"tasks.developer", model: 'User'}).exec()
            let tasks: any = []

            docs.forEach((doc:any) => {
                doc.tasks.forEach((task:any) => {
                    console.log(task)
                    if(task.developer){
                        if(task.developer._id.equals(user)) tasks.push(task)
                    }
                })
            })

            if(!docs){
                return res.json({
                    status: 404,
                    message: 'Tasks not found'
                })
            }

            return res.json({
                status: 200,
                tasks
            }) 
        }
        catch (err) {
            return handleError( {message: err.message, status: 500}, res)
        }
    }

    async add(req: express.Request, res: express.Response) {
        let postData = {
            idProject: req.body.idProject,
            tasks: req.body.tasks
        };

        try{
            let tasks:any = await TaskModel.findOne({idProject: postData.idProject}).exec()
            if(!tasks) {
                let createdTask = await new TaskModel(postData).save()
                return res.json({
                    status: 200,
                    tasks: createdTask
                })
            }else{
                tasks.tasks.push(...postData.tasks)
                let updateTasks = await tasks.save()

                return res.json({
                    status: 200,
                    tasks: updateTasks
                })
            }    

        }catch(error) {
            return handleError( {message: error, status: 500}, res)
        }

    }

    async changeTaskStatusName(statusName:string, requestTask:any, idProject:any) {
        
        try{
            let tasksDocument:any = await TaskModel.findOne({idProject}).populate('developer').exec()
           
            if(tasksDocument) {
                tasksDocument.tasks.forEach((task:any) => {
                    if(task._id.toString() === requestTask._id.toString()) {
                        task.status = statusName
                    }
                })

                return await tasksDocument.save()
                
            }


        }catch(error) {
            return console.error(error)
        }

    }

    async getTaskByBacklog(req: express.Request, res: express.Response) {
        try{

            let idProject = req.query.idProject

            let tasks = await TaskModel.findOne({idProject: idProject}).populate(['developer']).exec()
            if(tasks) {
                return res.json({
                    status: 200,
                    idTask: tasks._id,
                    backlog: tasks.tasks.filter((task:Task) => task.backlog) 
                })
            }

        }catch(error){
            return handleError( {message: error, status: 500}, res)
        }
    }

    async changeBacklogStatus(tasks:DocumentTasks, idTask:string) {
        try{
            if(tasks) {
                tasks.tasks.forEach((task:Task) => {
                    if(task._id.equals(idTask)) {
                        task.backlog = !task.backlog
                    }
                })
                await tasks.save()
            }

        }catch(error){
            return new Error(error)
        }
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