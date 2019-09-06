import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

//Modules
import {DBModule} from './db/DBModule'
import UserRouter from './modules/UserModule/routes/UserRoutes'

dotenv.config({path: __dirname + '/.env'});

const app = express();
new DBModule(process.env.MONGODB_URL);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/user', UserRouter)

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('Server starting...');
})