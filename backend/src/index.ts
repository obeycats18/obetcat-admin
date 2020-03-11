import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import cors from 'cors'

//Modules
import checkAuth from './middlewares/checkAuth';
import db from './middlewares/db'
import {index} from "./routes";

dotenv.config({path: __dirname + '/.env'});

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

app.use(cors({
    origin: "http://localhost:3000",
}))
app.use(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Check JWT Token
app.use(checkAuth);

//Routers
index(app);

app.listen(process.env.PORT, () => {
    console.log('Server starting on...' + process.env.PORT);
});