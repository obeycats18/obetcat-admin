import express from 'express'

import { UserModel } from './../../UserModule/schemas/UserSchema';
import {TeamModel} from "../models/models";

import { handleError } from '../../../middlewares/errorHandling/errorHandling';

export class TeamController {

    async getByCurrentUser(req: express.Request, res: express.Response) {
        try{
            const userId = req.user._id
            const user:any = await UserModel.findById(userId).exec()
            // let teams = await  Promise.all(user.teams.map(async (teamId:any) => await TeamModel.findById(teamId).populate("members").exec()))
            const teamsAll = await TeamModel.find({}).populate('members').exec()
            let teams: any[] = []
            if(teamsAll.length) {
                user.teams.forEach( (teamId: string) => {
                    let t = teamsAll.filter( team => team._id.toString() === teamId.toString())
                    teams.push(...t)
                })
            }
            if(teams) {
                return res.json({
                    status: 200,
                    teams
                })
            }else{
                return res.json({
                    status: 404,
                    message: "Teams not found"
                })
            }
        }catch(error){
            return handleError( {message: error, status: 500}, res)
        }

    }

    async getAll (req: express.Request, res: express.Response) {
        try{

            const teams = await TeamModel.find({}).populate("members").exec()
            console.log(teams)
            if(teams) {
                return res.json({
                    status: 200,
                    teams
                })
            }else{
                return res.json({
                    status: 404,
                    message: "Teams not found"
                })
            }
        }catch(error){
            return handleError( {message: error, status: 500}, res)
        }

    }

    async getMembers (req: express.Request, res: express.Response) {
        try{

            let id = req.query.idTeam

            let teams:any = await TeamModel.findById(id).populate("members").exec()
            if(teams) {
                return res.json({
                    status: 200,
                    members: teams.members
                })
            }else{
                return res.json({
                    status: 404,
                    message: "Members not found"
                })
            }
        }catch(error){
            return handleError( {message: error, status: 500}, res)
        }

    }

    async createTeam(req: express.Request, res: express.Response) {
        try{
            let postData = {
                name: req.body.name,
                members: req.body.members
            }

            
            if(!postData.members.includes(req.user._id)) postData.members.push(req.user._id)

            let createdTeam = await new TeamModel(postData).save()
            

            if(createdTeam) {

                postData.members.forEach(async (member:any) => {
                    await UserModel.findByIdAndUpdate(member, {$push: {teams: createdTeam._id}})
                })

                return res.json({
                    status: 200,
                    teams: createdTeam
                })
            }

        }catch(error) {
            return handleError( {message: error, status: 500}, res)
        }
    }

}