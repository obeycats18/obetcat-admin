import { UserModel, IUser } from "../../UserModule/schemas/UserSchema";
import express from 'express'
import createToken from "../jwt/createToken";
import bcrypt from 'bcrypt'
import { findOne } from "../../../db/queries/queries";
import { handleError } from "../../../middlewares/errorHandling/errorHandling";

import {getRole} from '../../../helper/Roles'

export class AuthController {

    // route( '/registration')
    createUser = (req:express.Request, res:express.Response) => {

        let newUser = req.body
        
        findOne(UserModel, {email: newUser.email}, (err, user) => {

            if(err){
                return handleError( {message: err.message, status: 500}, res)
            }

            if(user){
                return res.send({
                    message: 'User is exicted',
                    status: 409
                })
            }

            newUser.role = getRole(newUser.role)
            
            new UserModel(newUser).save( ( err ) => {
                if(err){
                    return handleError( {message: err.message, status: 500}, res)
                }else{
                    res.send({
                        message: 'User creted successfully',
                        status: 201
                    })
                }
            })
        })
    }

    login = (req:express.Request, res:express.Response) => {
        let postData = {
            email: req.body.email,
            password: req.body.password
        }

        findOne(UserModel, {email: postData.email}, (err:any, user:IUser) => {
            if(err) {
                return handleError( {message: err.message, status: 500}, res)
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
