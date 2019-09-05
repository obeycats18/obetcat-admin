import express from 'express'
import dotenv from 'dotenv'

import {DBModule} from './db/DBModule'

dotenv.config({path: __dirname + '/.env'});

const app = express();
let db = new DBModule(process.env.MONGODB_URL);
if(db.getConnectedState()) {
    app.get('/', (_request : express.Request, response : express.Response) => {
        response.send('Hello World!');
    })
    
    app.listen(process.env.EXPRESS_PORT, () => {
        console.log('Server starting...');
    })
}else{
    console.log('Database not connected')
}

