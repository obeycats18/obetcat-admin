import mongoose from 'mongoose'

export const dbConnection = (_port: any) => {
    mongoose.connect(`mongodb://localhost:${_port}/obeycats`, {useNewUrlParser:true});

    mongoose.connection.on('error', err => {
        console.error(err);
    })

}


