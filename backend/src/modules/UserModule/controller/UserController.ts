import { UserModel } from "../schemas/UserSchema";
import express from 'express'
import { find, findById, findByIdAndRemove } from "../../../db/queries/queries";


export class UserController {

    // route( '/')
    index = (req:express.Request, res:express.Response) => {
        find(UserModel, {})
            .exec()
            .then(users => {
                if(!users){
                    return res.json({
                        status: 404,
                        message: 'User not found'
                    });
                }
                return res.json({
                    status: 200,
                    users
                })
            })
            .catch(err => {
                return res.json({
                    status: 500,
                    err
                })
            })
    }

    // route( '/delete')
    delete = (req:express.Request, res:express.Response) => {
        let userId = req.body.id
        findByIdAndRemove(UserModel, userId)
            .exec()
            .then( (user) => {

                if(!user) {
                    return res.json( {
                        message: 'User Not Found',
                        status: 404
                    })
                }

                return res.json( {
                    status: 200,
                    message: 'User deleted successfully!'
                } )
            })
            .catch( err => {
                return res.json({
                    status: 500,
                    err
                })
            })
    }

    getMe = (req:express.Request, res:express.Response) => {
        let userId = req.user._id
        findById(UserModel, userId )
            .exec()
            .then(user => {
                if(!user) {
                    return res.json( {
                        status: 404,
                        message: 'User not found'
                    } )
                }
                return res.json({
                    status: 200,
                    user
                })
            })
            .catch(err => {
                return res.json({
                    status: 500,
                    err
                })
            })
    }
}

