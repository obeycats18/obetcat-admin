import { UserModel } from "../schemas/UserSchema";
import express from 'express'
import { find, findById, findByIdAndRemove } from "../../../db/queries/queries";
import { handleError } from "../../../middlewares/errorHandling/errorHandling";


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
                return handleError( {message: err.message, status: 500}, res)
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
                return handleError( {message: err.message, status: 500}, res)
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
                return handleError( {message: err.message, status: 500}, res)
            })
    }
}

