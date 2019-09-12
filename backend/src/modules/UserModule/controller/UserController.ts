import { UserModel } from "../schemas/UserSchema";
import express from 'express'


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
}

