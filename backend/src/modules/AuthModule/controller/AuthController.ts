import { UserModel, IUser } from "../../UserModule/schemas/UserSchema";
import express from 'express'
import createToken from "../jwt/createToken";
import bcrypt from 'bcrypt'


export class AuthController {

    // route( '/registration')
    createUser = (req:express.Request, res:express.Response) => {

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

    login = (req:express.Request, res:express.Response) => {
        let postData = {
            email: req.body.email,
            password: req.body.password
        }

        UserModel.findOne({email: postData.email}, (err:any, user:IUser) => {
            if(err) {
                return res.send({
                    err
                })
            }
            if(!user){
                return res.send({
                    message: 'User not found!',
                    status: 404
                })
            }

            if(bcrypt.compareSync(postData.password, user.password)) {
                const token = createToken(user);
                res.json({
                    status: 201,
                    token
                })
            }else{
                res.json({
                    message: 'Password invalid!',
                    status: 400,
                    err
                })
            }
            
        })
    }
}


// TODO:Create validation for all props in UserSchema and send error to client-side! 
