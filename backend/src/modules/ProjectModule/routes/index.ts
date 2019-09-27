import express from 'express'
import ProjectRoutes from "./ProjectRoutes";
import MilestonesRoutes from "./MilestonesRoutes";
import TaskRoutes from "./TaskRoutes";

export let project = (app:express.Express) => {
    app.use('', ProjectRoutes);
    app.use('', MilestonesRoutes);
    app.use('', TaskRoutes);
};