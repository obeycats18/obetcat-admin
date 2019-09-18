import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'


//Modules
import UserRouter from './modules/UserModule/routes/UserRoutes'
import AuthRouter from './modules/AuthModule/routes/AuthRoutes'
import ProjectRoutes from './modules/ProjectModule/routes/ProjectRoutes'
import checkAuth from './middlewares/checkAuth';
import db from './middlewares/db'

dotenv.config({path: __dirname + '/.env'});

const app = express();

app.use(db)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(checkAuth)

app.use('/user', UserRouter)
app.use('', AuthRouter)
app.use('', ProjectRoutes)

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('Server starting...');
})