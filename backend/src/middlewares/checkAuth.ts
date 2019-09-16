import express from 'express'
import verifyJWT from '../modules/AuthModule/jwt/verifyJWT';
import { IUser } from '../modules/UserModule/schemas/UserSchema';

export default (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if(req.path === '/login' || req.path === '/registration') 
        return next();

    const token = req.headers.token;

    verifyJWT(token)
        .then( (user:any) => {
            let postData: IUser = user.data._doc
            req.body.user = postData;
            next()
        })
        .catch(err => {
            return res.json({
                message: 'Invalid token',
                status: 403,
                err
            })
        }) 

}