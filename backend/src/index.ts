import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'


//Modules
import checkAuth from './middlewares/checkAuth';
import db from './middlewares/db'
import {index} from "./routes";

dotenv.config({path: __dirname + '/.env'});

const app = express();

app.use(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Check JWT Token
app.use(checkAuth);

//Routers
index(app);

app.listen(3003, () => {
    console.log('Server starting...');
});