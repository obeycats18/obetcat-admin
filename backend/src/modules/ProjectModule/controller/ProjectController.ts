import express from 'express'
import { ProjectModel } from '../models/models'
import { IUser, UserModel } from '../../UserModule/schemas/UserSchema';

export class ProjectController {

    index (req: express.Request, res: express.Response) {
        let userId = req.body.user;
        
        ProjectModel.find( {owner: userId}, (err, project) => {
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

        // UserModel.find( {_id: userId}, (err, user: IUser) => {
        //     if(err){
        //         return res.json({
        //             status: 404,
        //             message: 'User not found'
        //         })
        //     }

           
        // })
    }

    add(req: express.Request, res: express.Response) {
        let postData = {
            name: req.body.name,
            image: req.body.image,
            cost: req.body.cost,
            dateToFinish: req.body.dateToFinish,
            owner: req.body.owner
        }

        new ProjectModel(postData).save( (err, project) => {
            if(err){
                return res.json({
                    status: 500,
                    err 
                })
            }

            res.json({
                status: 200
            })
        })
    }

}