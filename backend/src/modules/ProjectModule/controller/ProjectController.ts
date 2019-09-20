import express from 'express'
import { ProjectModel } from '../models/models'
import { Roles } from '../enum/RoleEnum';
import { IUser } from '../../UserModule/schemas/UserSchema';

export class ProjectController {

    index (req: express.Request, res: express.Response) {
        let user = req.user; //decoded data from token
        
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

    add(req: express.Request, res: express.Response) {
        let userId = req.user._id ;
        let teamLeadId = req.body.tlId //id team lead
        let clientId = req.body.clientId //id client
        let postData = {
            name: req.body.name,
            image: req.body.image,
            cost: req.body.cost,
            dateToFinish: req.body.dateToFinish,
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

}

// Todo add validation for Date type
// Fixed req.user type. Now I use passport type