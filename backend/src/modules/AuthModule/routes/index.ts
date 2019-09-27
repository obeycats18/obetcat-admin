import express from 'express'
import AuthRouter from "./AuthRoutes";

export let auth = (app:express.Express) => {
    app.use('', AuthRouter)
};