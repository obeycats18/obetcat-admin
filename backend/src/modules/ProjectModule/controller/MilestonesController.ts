import express from 'express'
import { MilestoneModel } from '../models/models';

export class MilestonesController {

    add(req: express.Request, res: express.Response) {

        let milestoneData = {
            name: req.body.name,
            isDeveloped: true,
            isNoReturn: req.body.isNoReturn,
            dateToFinish: req.body.dateToFinish,
            procentComplete: 50,
            developer: req.body.developer,
            projectID: req.body.projectID
        }

        MilestoneModel.findOne({name: milestoneData.name})
            .exec()
            .then(milestone => {
                if(milestone){
                    return res.json({
                        status: 409,
                        message: 'Milestone is exicted'
                    })
                }

                new MilestoneModel(milestoneData).save( (err) => {
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
            })
        
    }

}

// Todo add validation 