import express from 'express'
import { ProjectModel } from '../models/models'
import { dateFormat } from '../../../helper/dateFormat';
import { findOne, findById, find, findByIdAndUpdate } from '../../../db/queries/queries';
import { handleError } from '../../../middlewares/errorHandling/errorHandling';

import mongoose from 'mongoose'
import {reduce} from 'lodash'

export class ProjectController {

    default (req: express.Request, res: express.Response) {
        let user = req.user; //decoded data from token

        find(ProjectModel, {'owner': {"_id": new mongoose.Types.ObjectId(user._id)}})
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
        let id = req.query.id; //specified id project
        console.log(id)
        findById(ProjectModel, id)
            .populate(['owner', 'milestones', 'developers'])
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
        let teamLeadId = req.body.teamLead;//id team lead
        let clientId = req.body.client; //id client
        

        let postData = {
            name: req.body.name,
            image: req.body.image,
            cost: req.body.cost,
            isDeveloped: false,
            dateToFinish: new Date(req.body.dataToFinish),
            owner: [userId],
            // milestones: ,
            procentComplete: 50
        }

        findOne(ProjectModel, {name: postData.name}, (err, project) => {
            if(project){
                return res.send({
                    status: 409,
                    message: 'Project is exicted'
                })
            }
            postData.owner.push(teamLeadId, clientId)

            new ProjectModel(postData).save( (err, project) => {
                if(err){
                    return handleError( {message: err.message, status: 500}, res)
                }
    
                res.json({
                    status: 200,
                    message: 'Sucssesfully!',
                    id: project._id
                })
            })
        })
    }

    edit(req: express.Request, res: express.Response){
        let idProject = req.body.idProject;
        let idMilestone = req.body.idMilestone;
        let developerId = req.body.developerId;

        findByIdAndUpdate(ProjectModel, idProject, {"$push": {"milestones" : idMilestone }}, (err, project) => {
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

    delete(req: express.Request, res: express.Response){
        let id = req.query.id;
        
        ProjectModel.findByIdAndRemove(id, (err, project) => {
            if(err){
                return handleError( {message: err.message, status: 500}, res)
            }

            if(!project){
                return res.json({
                    status: 404,
                    message: 'Project not found',
                }) 
            }

            return res.json({
                status: 200,
                message: 'Success',
            })
        })
    }
}

// Fixed req.user type. Now I use passport type