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

            return res.json({
                status: 200,
                milestones
            })
        })
    }  

    add(req: express.Request, res: express.Response) {

        let postData = {
            idProject: req.body.idProject,
            milestones: [] as Array<Object>
        }
        let milestoneData = {
            name: req.body.name,
            isDeveloped: true,
            isNoReturn: req.body.isNoReturn,
            dateToFinish: req.body.dateToFinish,
            procentComplete: 50,
            developer: req.body.developer
        }

        
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
                        id: set._id
                    })
                })
            }else{

                let isExisted = checkIsExisted(set, milestoneData.name)

                if(isExisted){
                    return res.json({
                        status: 409,
                        message: 'Milestone is existed'
                    })
                }

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
            
                        return res.json({
                            status: 200,
                            message: 'Sucssesfully!',
                            id: set._id
                        })
                    } 
                )
            }
        })
    }

}


let checkIsExisted = (set:Array<Object> | any | null, name: string): boolean => {

    if( !set.milestones.find( (item:any) => {return item.name === name} )) return false;
    
    return true
}

// Todo add validation 