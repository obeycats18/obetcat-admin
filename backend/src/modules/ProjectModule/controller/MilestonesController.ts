import express from 'express'
import { MilestoneModel } from '../models/models';
import {checkIsExisted} from  '../../../helper/checkIsExisted'
import {dateFormat} from "../../../helper/dateFormat";
import {update, findOne, find, findByIdAndUpdate} from "../../../db/queries/queries";
import { handleError } from '../../../middlewares/errorHandling/errorHandling';

export class MilestonesController {

    default(req: express.Request, res: express.Response){

        let id = req.body.idProject;
        find(MilestoneModel, {idProject: id})
            .populate(['tasks', 'developers'])
            .exec()
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

    // edit(req: express.Request, res: express.Response) {
    //     let id = req.body.id
    //     let tasksId = req.body.tasksId;

    //     findByIdAndUpdate(MilestoneModel, id, {"$push": {"tasks" : tasksId}}, (err, set) => {
    //         if(err){
    //             return res.json({
    //                 status: 500,
    //                 err 
    //             })
    //         }
    //         return res.json({
    //             status: 200,
    //             message: 'Sucssesfully!',
    //             set
    //         })
    //     } )
    // }


    // If project is existing
    add(req: express.Request, res: express.Response, next:express.NextFunction) {

        let postData = {
            idProject: req.body.idProject,
            milestones: [] as Array<Object>
        };
        
        let milestoneData = {
            milestoneName: req.body.milestoneName,
            milestoneIsDeveloped: true,
            isNoReturn: req.body.isNoReturn,
            milestoneDate: new Date(req.body.milestoneDate),
            procentComplete: 50,
            developers: [] as Array<String>
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
                        id: set._id
                    })
                })
            }else{

                let isExisted = checkIsExisted(set.milestones, milestoneData.milestoneName)

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
                            set
                        })
                    }
                })
            }
        })
    }

}

// Todo add validation 