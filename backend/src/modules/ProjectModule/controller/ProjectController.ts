import express from 'express'
import { ProjectModel } from '../models/models'
import { dateFormat } from '../../../helper/dateFormat';
import { findOne, findById, find, findByIdAndUpdate } from '../../../db/queries/queries';
import { handleError } from '../../../middlewares/errorHandling/errorHandling';

export class ProjectController {

    default (req: express.Request, res: express.Response) {
        let user = req.user; //decoded data from token
    
        find(ProjectModel, {owner: user._id})
            .populate(['owner', 'milestones'])
            .exec( (err, project) => {
                if(err){
                    return handleError( {message: err.message, status: 500}, res)
                }
                
                res.json( {
                    status: 200,
                    project
                } )
            })
    }


    index (req: express.Request, res: express.Response) {
        let id = req.body.id; //specified id project

        findById(ProjectModel, id)
            .populate(['owner', 'milestones'])
            .exec( (err, project) => {
                if(err ){
                    return handleError( {message: err.message, status: 500}, res)
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
            isDeveloped: false,
            dateToFinish: dateFormat(new Date(req.body.dateToFinish)),
            owner: [userId]
        }

        findOne(ProjectModel, {name: postData.name}, (err, project) => {
            if(project){
                return res.send({
                    status: 409,
                    message: 'Project is exicted'
                })
            }
            postData.owner.push(teamLeadId, clientId)

            new ProjectModel(postData).save( (err) => {
                if(err){
                    return handleError( {message: err.message, status: 500}, res)
                }
    
                res.json({
                    status: 200,
                    message: 'Sucssesfully!',
                    project
                })
            })
        })
    }

    edit(req: express.Request, res: express.Response){
        let id = req.body.id;
        let milestioneId = req.body.milestioneId;
        let developerId = req.body.developerId;

        findByIdAndUpdate(ProjectModel, id, {"$push": {"milestones" : milestioneId , "owner" : developerId}}, (err, project) => {
            if(err){
                return handleError( {message: err.message, status: 500}, res)
            }
            return res.json({
                status: 200,
                message: 'Sucssesfully!',
                project
            })
        } )
    }
}

// Fixed req.user type. Now I use passport type