import { UserModel } from "../schemas/UserSchema";
import express from 'express'
import {IUser} from '../schemas/UserSchema'

let router = express.Router();

export class UserController {

    

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

    addUser = (req:express.Request, res:express.Response) => {
        
        let saltRounds = 10;

        let confirmPassword = req.body.confirmPassword;
        
        let newUser = {
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        
        UserModel.findOne({email: newUser.email})
            .exec()
            .then(user => {
                if(user){
                    return res.send({
                        message: 'User is exicted',
                        status: 409
                    })
                }else{
                    if(confirmPassword !== newUser.password){
                        return res.send( {
                            message: 'Password not equals',
                            status: 400
                        } )
                    }

                    new UserModel(newUser).save( ( err, user) => {
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
                }
            })
            .catch( err => {res.send( {status: 500} )})
    }
}

//TODO:Create hasing password for UserSchema  