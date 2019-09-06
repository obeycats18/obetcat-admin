import { UserModel } from "../model/UserModel";
import express from 'express'

let router = express.Router();

export class UserController {

    index = (req:express.Request, res:express.Response) => {
        UserModel.find({}, (err, docs) => {
            if(err) {
                console.log(err)
            }else{
                res.send(docs);
            }
        })
    }

    deleteUser = (req:express.Request, res:express.Response) => {
        let userId = req.params.id
        UserModel.findByIdAndRemove(userId, (err) => {
            if(err) {
                return res.status(500).send(err)
            }
            return res.status(200).send( userId + ' Deleted ~')
        })
    }

}