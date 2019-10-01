import express from 'express'
import { MilestoneModel } from '../models/models';
import {checkIsExisted} from  '../../../helper/checkIsExisted'
import {dateFormat} from "../../../helper/dateFormat";
import {update, findOne, find, findByIdAndUpdate} from "../../../db/queries/queries";

export class MilestonesController {

    default(req: express.Request, res: express.Response){

        // MilestoneModel.find({idProject: req.body.idProject})
        let id = req.body.idProject;
        find(MilestoneModel, {idProject: id})
            .populate('tasks')
            .exec()
            .then(milestones => {
                return res.json({
                    status: 200,
                    milestones
                })
            })
            .catch(err => {
                if(err) {
                    console.log(err)
                    return res.json({
                        status: 500,
                        err
                    })
                }

                
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

    add(req: express.Request, res: express.Response) {

        let postData = {
            idProject: req.body.idProject,
            milestones: [] as Array<Object>
        };
        let milestoneData = {
            name: req.body.name,
            isDeveloped: true,
            isNoReturn: req.body.isNoReturn,
            dateToFinish: dateFormat(new Date(req.body.dateToFinish)),
            procentComplete: 50,
            developer: req.body.developer
        };

        
        findOne(MilestoneModel, {idProject: postData.idProject}, ( err, set: Object | any) => {
            
            if(err) {
                console.log(err)
                return res.json({
                    status: 500,
                    err
                })
            }        

            if(!set) {
                postData.milestones.push(milestoneData);
                new MilestoneModel(postData).save( (err, set) => {
                    if(err){
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

                let isExisted = checkIsExisted(set.milestones, milestoneData.name)

                if(isExisted){
                    return res.json({
                        status: 409,
                        message: 'Milestone is existed'
                    })
                }

                update(MilestoneModel, {'idProject': postData.idProject}, {"$push": {"milestones" : milestoneData}}, (err, set) => {
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

}




// Todo add validation 