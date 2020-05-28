import { IProject } from './../schemes/ProjectModel';
import express, { response } from 'express'
import {BoardsModel, TaskModel, MilestoneModel} from "../models/models";
import { handleError } from '../../../middlewares/errorHandling/errorHandling';
import {TaskController} from '../controller/TaskController'
import {MilestonesController} from '../controller/MilestonesController'
import {ProjectController} from '../controller/ProjectController'


const TaskCTRL = new TaskController()
const MilestoneCTRL = new MilestonesController()
const ProjectCTRL = new ProjectController()



export class BoardsController {


    async getBoardByIdProject(req: express.Request, res: express.Response) {

        try{
            let idProject = req.query.idProject
            let boards = await BoardsModel.findOne({idProject})
                                .populate(['tasks'])
                                // .populate({path: 'tasks', model: "Tasks"})
                                .exec()

            if(boards){
                return res.json({
                    status: 200,
                    boards
                })
            }
            return res.json({
                status: 404,
                message: 'Boards not found'
            })

        }catch(error){
            return handleError({message: error, status: 500}, res)
        }

    }

    async init(req: express.Request, res: express.Response) {
 
        try{
            
            const boardsNames = ["Todo", "В разработке", "Выполненные"]
            
            const postData = {
                idProject: req.body.idProject,
                boards: boardsNames.map((name:string) => ({name}))
            }

            const initBoards:any = await new BoardsModel(postData).save()

            if(initBoards){
                return res.json({
                    status: 200,
                    boadrs: initBoards.boards
                })
            }

        }catch(error) { return handleError({message: error, status: 500}, res) }

    }

    async createBoard(req: express.Request, res: express.Response) {
 
        try{

            const postData = {
                idProject: req.body.idProject,
                board: {name: req.body.name}
            }

            const boardsDocument:any = await BoardsModel.findOne({idProject: postData.idProject}).populate('tasks').exec()
            if(boardsDocument){
                await BoardsModel.updateOne({idProject: postData.idProject}, {$push: {boards: postData.board}}).exec()
            
                return res.json({
                    status: 200,
                    boards: boardsDocument.boards
                })
            }
            
        }catch(error) { return handleError({message: error, status: 500}, res) }

    }

    async addTaskToBoards(req: express.Request, res: express.Response) {
 
        try{

            const idProject = req.body.idProject

            const tasksDocument:any = await TaskModel.findOne({idProject}).populate('developer').exec()
            const boardsDocument:any = await BoardsModel.findOne({idProject}).exec()

            if(boardsDocument && tasksDocument){

                boardsDocument.boards = boardsDocument.boards.map((board:any) => {
                    return {
                        _id: board._id,
                        name: board.name,
                        tasks: tasksDocument.tasks.filter((task:any) => task.status === board.name)
                    }
                })

                const updatedBoards = await boardsDocument.save()

                return res.json({
                    status: 200,
                    boards: updatedBoards
                })

            }

            
        }catch(error) { return handleError({message: error, status: 500}, res) }

    }

    async replaceTask (req: express.Request, res: express.Response) {
        try{

            const postData = {
                idProject: req.body.idProject,
                idDestBoard: req.body.idDestination,
                idSourceBoard: req.body.idSource,
                reqTask: req.body.task
            }
            
            const boardsDocument:any = await BoardsModel.findOne({idProject: postData.idProject}).exec()

            if(boardsDocument){
                let boards = boardsDocument.boards

                boards.forEach((board:any) => {
                    if(board._id.toString() === postData.idSourceBoard.toString()){
                        board.tasks = board.tasks.filter((task:any) => task._id.toString() !== postData.reqTask._id.toString()) 
                        
                    }
                    else if(board._id.toString() === postData.idDestBoard.toString() && !board.tasks.includes(postData.reqTask)) {
                        TaskCTRL.changeTaskStatusName(board.name, postData.reqTask, postData.idProject).then(tasks => {
                            MilestoneCTRL.caclProgress(postData.idProject, tasks.tasks).then((milestones) => {
                                ProjectCTRL.calcProjectProgress(milestones.milestones, postData.idProject)
                            })
                        })
                        
                        board.tasks.push(postData.reqTask)
                        postData.reqTask.status = board.name

                    }
                })

                

                const updateBoards = await boardsDocument.save()

                return res.json({
                    status: 200,
                    boards: updateBoards
                })
            }
            
        }catch(error) { console.log(error) }

    }
}