import express from 'express'
import {TeamController} from "../controller/TeamController";

let router = express.Router();

let Teams = new TeamController();

router.get('/teams', Teams.getByCurrentUser)
router.get('/teams/all', Teams.getAll)
router.get('/teams/members', Teams.getMembers)


router.post('/teams/add', Teams.createTeam)


export default router
