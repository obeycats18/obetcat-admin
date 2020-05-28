import { UserModel } from './../../UserModule/schemas/UserSchema';
import express from 'express'
import { ProjectModel } from '../models/models'
import { findByIdAndUpdate } from '../../../db/queries/queries';
import { handleError } from '../../../middlewares/errorHandling/errorHandling';

export class ProjectController {

    async default (req: express.Request, res: express.Response) {
        try{
            let userId = req.user._id; //decoded data from token
            let user:any = await UserModel.findById(userId).exec()
            let projects = [] as any

            if(user.role.name !== 'client'){
                projects = await ProjectModel.find().where('teams').in(user.teams).populate(['client', 'milestones', "members"]).populate({path: 'teams', populate: {path: "members", model: "User"}}).exec()
            }else{
                projects = await ProjectModel.find({client: userId}).populate(['client', 'milestones', "members"]).populate({path: 'teams', populate: {path: "members", model: "User"}}).exec()
            }

            if(!projects) {
                return res.json({
                    status: 404,
                    message: "Projects not found"
                })   
            }
            return res.json({
                status: 200,
                project: projects
            })
            
        }catch(error){
            return handleError( {message: error, status: 500}, res)
        }

    }

    async index (req: express.Request, res: express.Response) {
        try{
            let idProject = req.query.id; //specified id project
            let project = await ProjectModel.findById(idProject).populate(["milestones", "teams"]).exec()

            if(!project){
                return res.json({
                    status: 400,
                    project
                })
                
            }

            return res.json({
                status: 200,
                project
            })

        }catch(error) {
            return handleError( {message: error, status: 500}, res)

        }

    }

    async add(req: express.Request, res: express.Response) {

        try{
            let postData = {
                name: req.body.name,
                client: req.body.client,
                teams: req.body.teams,
                dateToFinish: req.body.dateToFinish,
            }

            let project = await ProjectModel.findOne({name: postData.name}).exec()
            
            if(project) {
                return res.send({
                    status: 409,
                    message: 'Project is exicted'
                })
            }
    
            let createdProject = await new ProjectModel(postData).save()

            return res.json({
                status: 200,
                id: createdProject._id,
                idTeams: postData.teams
            })
        }catch(error){
            return handleError( {message: error, status: 500}, res)
        }

        
    }

    async calcProjectProgress(milestones:any, idProject:string ) {

        try{
            
            let project = await ProjectModel.findById(idProject).populate(['client', 'milestones']).exec()
            
            if(project && milestones) {
                let totalMilestonesCount = milestones.length
                let milestonesCompleteCount = 0

                let procent = 0
                
                milestones.forEach((milestone:any) => {
                    if(!milestone.isDevelop) milestonesCompleteCount++
                })

                procent = milestonesCompleteCount / totalMilestonesCount * 100
                project.procentComplete = parseInt(procent.toFixed(2))

                if( project.procentComplete >= 100){
                    project.procentComplete = 100
                    project.isDeveloped = false
                }else{
                    project.isDeveloped = true
                }

                await project.save()

            }
            
        }catch(error){
            return console.error(error)
        }

        
    }

    async edit(req: express.Request, res: express.Response){
        try{
            let idProject = req.body.idProject;
            let idMilestone = req.body.idMilestone;
    
            if(idMilestone){
                let updatedProject = await ProjectModel.update({_id: idProject}, {"$push": {"milestones" : idMilestone }}).exec()

                if(updatedProject){
                    return res.json({
                        status: 200,
                        project: updatedProject
                    })
                }
            }

            return res.json({
                status: 200,
                project: await ProjectModel.findById(idProject).populate(['client', 'milestones', "members"]).populate({path: 'teams', populate: {path: "members", model: "User"}})
            })



        }catch(error) {
            return handleError( {message: error.message, status: 500}, res)
        }

        // findByIdAndUpdate(ProjectModel, idProject, {"$push": {"milestones" : idMilestone }}, (err, project) => {
        //     if(err){
        //         return handleError( {message: err.message, status: 500}, res)
        //     }
        //     return res.json({
        //         status: 200,
        //         message: 'Sucssesfully!',
        //         project
        //     })
        // } )
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