import express from 'express'
import { MilestoneModel } from '../models/models';

export class MilestonesController {

    default(req: express.Request, res: express.Response){
        MilestoneModel.find({idProject: req.body.idProject}, (err, milestones) => {
            if(err) {
                console.log(err)
                return res.json({
                    status: 500,
                    err
                })
            }

            res.json({
                status: 200,
                milestones
            })
        })
    }  

    add(req: express.Request, res: express.Response) {

        let postData = {
            idProject: req.body.idProject,
            milestones: [] as any
        }
        let milestoneData = {
            name: req.body.name,
            isDeveloped: true,
            isNoReturn: req.body.isNoReturn,
            dateToFinish: req.body.dateToFinish,
            procentComplete: 50,
            developer: req.body.developer
        }

        
        MilestoneModel.findOne({'milestones.name': milestoneData.name}, ( err, milestone ) => {
            if(err) {
                console.log(err)
                return res.json({
                    status: 500,
                    err
                })
            }

            if(milestone){
                return res.json({
                    status: 409,
                    message: 'Milestone is existed'
                })
            }

            if(postData.milestones.lenght === 0){
                postData.milestones.push(milestoneData);
                new MilestoneModel(postData).save( (err) => {
                    if(err){
                        return res.json({
                            status: 500,
                            err 
                        })
                    }
        
                    res.json({
                        status: 200,
                        message: 'Sucssesfully!'
                    })
                })
            }else{
                MilestoneModel.findOneAndUpdate({idProject: postData.idProject}, 
                    {"$push": {"milestones" : milestoneData}},
                    {"new": true, "upsert": true},
                    (err) => {
                        if(err){
                            return res.json({
                                status: 500,
                                err 
                            })
                        }
            
                        res.json({
                            status: 200,
                            message: 'Sucssesfully!'
                        })
                    } 
                )
            }

        })
    }

}

// Todo add validation 