import express from 'express'
import TeamRoutes from "./TeamRoutes";

export let teams = (app:express.Express) => {
    app.use('', TeamRoutes);
};