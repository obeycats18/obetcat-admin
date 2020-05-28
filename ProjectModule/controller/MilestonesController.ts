import express from 'express'
import { MilestoneModel, TaskModel } from '../models/models';

import {checkIsExisted} from  '../../../helper/checkIsExisted'
import {update, findOne, find, findByIdAndUpdate} from "../../../db/queries/queries";
import { handleError } from '../../../middlewares/errorHandling/errorHandling';
import { TaskController } from './TaskController';
import { Task } from '../schemes/TaskModel';


const TaskCTRL = new TaskController()

export class MilestonesController {

    async index(req: express.Request, res: express.Response){

        try{
            const idProject = req.query.idProject;
            
            let milestones = await MilestoneModel.findOne({idProject}).exec()

            if(milestones) {
                return res.json({
                    status: 200,
                    idMilestone: milestones._id, 
                    milestones: milestones.milestones
                })
            }
        }catch(error){
            return handleError( {message: error, status: 500}, res)
        }

    }  

    async caclProgress(idProject:string, tasks:any){

        try{

            let milestonesDocuments:any = await MilestoneModel.findOne({idProject}).exec()
            if(milestonesDocuments && tasks) {
                
                // Milestones ForEach
                milestonesDocuments.milestones.forEach((milestone:any) => {

                    let tasksTotalCount = 0
                    let tasksCompleteCount = 0

                    let filteredTask = [] as any
                    if(milestone.tasks.length){
                         
                        // Tasks ForEach
                        for(let i = 0; i < milestone.tasks.length; i++) {
                            for(let j = 0; j < tasks.length; j++) {
                                if(tasks[j]._id.toString() === milestone.tasks[i]._id.toString())
                                filteredTask.push(tasks[j])
                            }
                        }

                        tasksTotalCount = filteredTask.length

                        filteredTask.forEach((task:any) => {
                            if(task.status === 'Выполненные'){
                                tasksCompleteCount++
                            }
                        })

                        

                        let procent = tasksCompleteCount / tasksTotalCount * 100

                        console.log("procent", procent)

                        milestone.procentComplete = parseInt(procent.toFixed(2))
                        if( milestone.procentComplete >= 100){
                            milestone.procentComplete = 100
                            milestone.isDevelop = false
                        }else{
                            milestone.isDevelop = true
                        }

                    }

                    
                })

                return await milestonesDocuments.save()
            }
        }catch(error){
            throw new Error(error)
        }

    }  

    

    async edit(req: express.Request, res: express.Response) {

        try{

            const {
                idProject,
                idSource,
                idDestination,
                tasks: reqTasks
            } = req.body
            
    
            let milestones:any = await MilestoneModel.findOne({idProject}).exec()
            let tasks:any = await TaskModel.findOne({idProject}).exec()

            if(tasks){
                if(tasks._id.equals(idSource) || tasks._id.equals(idDestination)){
                    TaskCTRL.changeBacklogStatus(tasks, reqTasks._id)
                }
            }

            if(milestones) {
                milestones.milestones.forEach((milestone:any) => {
                    if(milestone._id.equals(idSource)){
                        milestone.tasks = milestone.tasks.filter((task:Task) => task._id.toString() !== reqTasks._id.toString()) 
                    }else if(milestone._id.equals(idDestination)) {
                        milestone.tasks.push(reqTasks) 
                    }
                })
                milestones.save()
                
                return res.json({
                    status: 200,
                    message: 'Sucssesfully!',
                    milestones
                })
            
            }else{ 
                return res.json({
                    status: 404,
                    message: 'Milestones not found!',
                })
            }
            
        }    
        catch (err) {
            return handleError( {message: err.message, status: 500}, res)
        }
        
    }


    // If project is existing
    add(req: express.Request, res: express.Response, next:express.NextFunction) {

        let postData = {
            idProject: req.body.idProject,
            milestones: [] as Array<Object>
        };
        
        let milestoneData = {
            name: req.body.name,
            isNoReturn: req.body.isNoReturn,
            date: new Date(req.body.milestoneDate),
        };

        
        findOne(MilestoneModel, {idProject: postData.idProject}, ( err, set: Object | any) => {
            
            if(err) {
                return handleError( {message: err.message, status: 500}, res)
            }        

            if(!set) {
                postData.milestones.push(milestoneData);
                new MilestoneModel(postData).save( (err, set) => {
                    if(err){
                        return handleError( {message: err.message, status: 500}, res)
                    }

                    return res.json({
                        status: 200,
                        message: 'Sucssesfully!',
                        milestones: set
                    })
                })
            }else{

                let isExisted = checkIsExisted(set.milestones, milestoneData.name)

                if(isExisted){
                    return res.json({
                        status: 409,
                        message: 'Milestone is existed'
                    })
                }

                update(MilestoneModel, {'idProject': postData.idProject}, {"$push": {"milestones" : milestoneData}}, (err, set) => {
                    if(err){
                        return handleError( {message: err.message, status: 500}, res)
                    }else{
                        return res.json({
                            status: 200,
                            milestones: set
                        })
                    }
                })
            }
        })
    }

}
