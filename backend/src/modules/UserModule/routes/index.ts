import express from 'express'
import UserRouter from "./UserRouter";

export let user = (app:express.Express) => {
    app.use('', UserRouter)
};