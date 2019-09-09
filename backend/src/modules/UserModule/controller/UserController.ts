import { UserModel } from "../schemas/UserSchema";
import express from 'express'
import {IUser} from '../schemas/UserSchema'

let router = express.Router();

export class UserController {

    // route( '/')
    index = (req:express.Request, res:express.Response) => {
        UserModel.find({}, (err, docs) => {
            if(err) {
                res.send( {
                    status: 500
                } )
            }else{
                if(docs.length > 0){
                    res.send({
                        users: docs
                    });
                }else{
                    res.send({
                        message: 'Empty User list'
                    })
                }
            }
        })
    }

    // route( '/delete')
    deleteUser = (req:express.Request, res:express.Response) => {
        let userId = req.body.id
        UserModel.findByIdAndRemove(userId, (err) => {
            if(err) {
                res.send( {
                    message: 'User Not Found',
                    status: 404
                })
            }
            res.send( {
                message: 'User deleted successfully!',
                status: 200
            } )
        })
    }

    // route( '/registration')
    addUser = (req:express.Request, res:express.Response) => {

        let newUser = req.body
        
        UserModel.findOne({email: newUser.email})
            .exec()
            .then(user => {
                if(user){
                    return res.send({
                        message: 'User is exicted',
                        status: 409
                    })
                }

                new UserModel(newUser).save( ( err ) => {
                    if(err){
                        res.send({
                            message: err,
                            status: 500
                        })
                    }else{
                        res.send({
                            message: 'User creted successfully',
                            status: 201
                        })
                    }
                })
            })
            .catch( err => {res.send( {message: err, status: 500} )})
    }
}

//TODO:Create validation for all props in UserSchema and send error to client-side! 