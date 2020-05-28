import express from 'express'
import ProjectRoutes from "./ProjectRoutes";
import MilestonesRoutes from "./MilestonesRoutes";
import TaskRoutes from "./TaskRoutes";
import BoardsRoutes from "./BoardsRoutes";


export let project = (app:express.Express) => {
    app.use('', ProjectRoutes);
    app.use('', TaskRoutes);
    app.use('', MilestonesRoutes);
    app.use('', BoardsRoutes);

};