import express from 'express'
import { MilestoneModel } from '../models/models';
import {checkIsExisted} from  '../../../helper/checkIsExisted'
import {dateFormat} from "../../../helper/dateFormat";
import {update} from "../queries/update";

export class MilestonesController {

    default(req: express.Request, res: express.Response){
        MilestoneModel.find({idProject: req.body.idProject})
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

    edit(req: express.Request, res: express.Response) {
        let id = req.body.id
        let tasksId = req.body.tasksId;
        MilestoneModel.findByIdAndUpdate(id, 
            {"$push": {"tasks" : tasksId}},
            {"new": true, "upsert": true},
            (err, set) => {
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
            } 
        )
    }

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

        
        MilestoneModel.findOne({idProject: postData.idProject}, ( err, set: Object | any) => {
            
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

                update(MilestoneModel, {'idProject': postData.idProject}, '$push', {"milestones" : milestoneData},
                    (set) => {
                        return res.json({
                            status: 200,
                            message: 'Sucssesfully!',
                            set
                        })
                });
            }
        })
    }

}




// Todo add validation 