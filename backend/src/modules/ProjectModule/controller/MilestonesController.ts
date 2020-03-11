import express from 'express'
import { MilestoneModel, TaskModel } from '../models/models';

import {checkIsExisted} from  '../../../helper/checkIsExisted'
import {dateFormat} from "../../../helper/dateFormat";
import {update, findOne, find, findByIdAndUpdate} from "../../../db/queries/queries";
import { handleError } from '../../../middlewares/errorHandling/errorHandling';

import {reduce} from 'lodash'

import mongoose from 'mongoose'

export class MilestonesController {

    default(req: express.Request, res: express.Response){

        const id = req.query.id;
        findOne(MilestoneModel, {idProject: id})
            .populate(['tasks', 'developers'])
            .then(milestones => {
                return res.json({
                    status: 200,
                    milestones
                })
            })
            .catch(err => {
                return handleError( {message: err.message, status: 500}, res)
            })

    }  

    

    async edit(req: express.Request, res: express.Response) {

        try{

            let idProject = req.body.idProject
            let idSource = req.body.idSource
            let idDestination = req.body.idDestination
            let reqTasks = req.body.tasks
    
            let milestones:any = await MilestoneModel.findOne({idProject})
            let tasks:any = await TaskModel.findOne({idProject})

            if(tasks){
                if(`${tasks._id}` === `${idSource}`){
                    tasks.tasks = tasks.tasks.filter((task:any) => `${task._id}` !== `${reqTasks._id}`) 
                }else if(`${tasks._id}` === `${idDestination}`){
                    tasks.tasks.push(reqTasks)
                }
                tasks.save()
            }

            if(milestones) {
                milestones.milestones.forEach((milestone:any) => {
                    if(`${milestone._id}` === `${idSource}`){
                        milestone.tasks = milestone.tasks.filter((task:any) => `${task._id}` !== `${reqTasks._id}`) 
                    }else if(`${milestone._id}` === `${idDestination}`) {
                        milestone.tasks.push(reqTasks)
                    }
                })
                milestones.save()
                
                return res.json({
                    status: 200,
                    message: 'Sucssesfully!',
                    milestones,
                    tasks
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
            isDevelop: true,
            isNoReturn: req.body.isNoReturn,
            date: new Date(req.body.milestoneDate),
            procentComplete: 50,
            // developers: [] as Array<String>
            // developer: req.body.developer
        };

        
        findOne(MilestoneModel, {idProject: postData.idProject}, ( err, set: Object | any) => {
            
            if(err) {
                return handleError( {message: err.message, status: 500}, res)
            }        

            // milestoneData.developers = req.body.developers.map( (item:string) => {
            //     return item;
            // })

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

// Todo add validation 