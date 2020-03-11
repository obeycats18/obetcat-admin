import express from 'express'
import mongoose from 'mongoose'
import {BoardsModel} from "../models/models";
import {update, findOne, findById, find} from "../../../db/queries/queries";
import { handleError } from '../../../middlewares/errorHandling/errorHandling';
export class BoardsController {


    async default(req: express.Request, res: express.Response) {
        

        try{
            let idProject = req.body.idProject
            let boards = await find(BoardsModel, {"idProject": idProject}).populate('tasks')

            res.json({
                status: 200,
                boards
            })

        }catch(e){
            return handleError({message: e, status: 500}, res)
        }

    }

    index(req: express.Request, res: express.Response) {
        
    }

    async add(req: express.Request, res: express.Response) {
        try{
            let payload = {
                idProject: req.body.idProject,
                boards: {
                    name: req.body.name,
                    tasks: req.body.tasks.map((item:string) => new mongoose.Types.ObjectId(item))
                }
            }

            let board = new BoardsModel(payload)
            let response = await board.save()

            return res.json({
                status: 200,
                boards: response
            })
        }catch(e){
            return handleError({message: e, status: 500}, res)
        }
    }

    async edit (req: express.Request, res: express.Response) {
        
    }
}