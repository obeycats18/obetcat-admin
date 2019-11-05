import express from 'express'
import {DBModule} from '../db/DBModule'

export default (req:express.Request, res:express.Response, next:express.NextFunction) => {
    let db = new DBModule(process.env.MONGODB_URI || ' mongodb+srv://kapishdima:<password>@obeycats-xm3c9.mongodb.net/test?retryWrites=true&w=majority');
    next()
}