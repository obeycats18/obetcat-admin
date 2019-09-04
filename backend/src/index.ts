import express from 'express'
import dotenv from 'dotenv'

import { dbConnection } from './db';

dotenv.config();

const app = express();
dbConnection( process.env.MONGODB_PORT\);

app.get('/', (_request : express.Request, response : express.Response) => {
    response.send('Hello World!');
})

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('Server starting...');
})