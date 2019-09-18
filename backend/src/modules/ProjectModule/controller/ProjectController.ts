import express from 'express'
import { ProjectModel } from '../models/models'
import { Roles } from '../enum/RoleEnum';
import { IUser } from '../../UserModule/schemas/UserSchema';

export class ProjectController {

    index (req: express.Request, res: express.Response) {
        let user = req.user;
        
        if(user.role === Roles.Client || user.role === Roles.Developer) {
            ProjectModel.find( {owner: user._id} )
            .populate('owner')
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

    }

    add(req: express.Request, res: express.Response) {
        let userId = req.user._id ;
        let postData = {
            name: req.body.name,
            image: req.body.image,
            cost: req.body.cost,
            dateToFinish: req.body.dateToFinish,
            owner: userId
        }

        ProjectModel.findOne({name: postData.name})
            .exec()
            .then(project => {
                if(project){
                    return res.send({
                        message: 'Project is exicted',
                        status: 409
                    })
                }
                
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

}

// Todo add validation for Date type
// Fixed req.user type. Now I use passport type