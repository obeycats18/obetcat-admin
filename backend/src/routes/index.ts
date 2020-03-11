import express from 'express'
import {project} from "../modules/ProjectModule/routes";
import {auth} from "../modules/AuthModule/routes";
import {user} from "../modules/UserModule/routes";



export let index = (app:express.Express) => {
    auth(app);
    user(app);
    project(app);

};