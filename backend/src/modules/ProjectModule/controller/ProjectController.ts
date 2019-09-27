import express from 'express'
import { ProjectModel } from '../models/models'
import { dateFormat } from '../../../helper/dateFormat';

export class ProjectController {

    default (req: express.Request, res: express.Response) {
        let user = req.user; //decoded data from token
        
        ProjectModel.find( {owner: user._id} )
            .populate(['owner', 'milestones'])
            .exec( (err, project) => {
                if(err){
                    return res.json({
                        status: 404,
                        message: 'Projects not found'
                    })
                }
                
                res.json( {
                    status: 200,
                    project
                } )
            })
    }


    index (req: express.Request, res: express.Response) {
        let id = req.body.id; //specified id project
        
        ProjectModel.findById(id)
            .populate(['owner', 'milestones'])
            .exec( (err, project) => {
                if(err ){
                    return res.json({
                        status: 500,
                        err
                    })
                }

                if(!project) {
                    return res.json({
                        status: 404,
                        message: 'Projects not found'
                    })
                }

                return res.json( {
                    status: 200,
                    project
                } )
            })
    }

    add(req: express.Request, res: express.Response) {
        let userId = req.user._id ; // current user id
        let teamLeadId = req.body.teamLeadId;//id team lead
        let clientId = req.body.clientId; //id client
        
        let postData = {
            name: req.body.name,
            image: req.body.image,
            cost: req.body.cost,
            dateToFinish: dateFormat(new Date(req.body.dateToFinish)),
            owner: [userId]
        }

        ProjectModel.findOne({name: postData.name})
            .exec()
            .then(project => {
                if(project){
                    return res.send({
                        status: 409,
                        message: 'Project is exicted'
                    })
                }
                postData.owner.push(teamLeadId, clientId)

                new ProjectModel(postData).save( (err) => {
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
            .catch(err => {
                res.json({
                    status: 500,
                    err
                })
            })
    }

    edit(req: express.Request, res: express.Response){
        let id = req.body.id;
        let milestioneId = req.body.milestioneId;
        let developerId = req.body.developerId;

        ProjectModel.findByIdAndUpdate(id, 
            {"$push": {"milestones" : milestioneId , "owner" : developerId}},
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
                    message: 'Sucssesfully!'
                })
            } 
        )
    }
}

// Fixed req.user type. Now I use passport type