import express from 'express'
import AuthorizationRoutes from './AuthorizationRoutes'

export let github = (app:express.Express) => {
    app.use('', AuthorizationRoutes);
};