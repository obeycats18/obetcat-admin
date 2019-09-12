import express from 'express'
import verifyJWT from '../modules/AuthModule/jwt/verifyJWT';

export default (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if(req.path === '/login' || req.path === '/registration') 
        return next();

    const token = req.headers.token;

    verifyJWT(token)
        .then( (user:any) => {
            req.user = user;
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