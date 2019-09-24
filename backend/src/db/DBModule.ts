import mongoose from 'mongoose'

export class DBModule{
    
    private dbUrl : string;
    constructor (url:any) {
        this.dbUrl = url;
        this.config();
        this.connection(this.dbUrl);
    }

    config = () => {
        mongoose.set('useFindAndModify', false);
    }

    connection = (url: string) =>{
        mongoose.connect(`${url}`, {useNewUrlParser:true, useFindAndModify: false}).catch( error => console.log(error));
    }

}


// Todo create function with Promise


