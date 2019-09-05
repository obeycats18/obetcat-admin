import mongoose from 'mongoose'

export class DBModule{
    
    private dbUrl : string;
    private connected: boolean;

    constructor (url:any) {
        this.connected = false;
        this.dbUrl = url;
        this.connection(this.dbUrl);
    }

    connection = (url: string) =>{
        mongoose.connect(`${url}`, {useNewUrlParser:true}).catch( error => console.log(error));

        mongoose.connection.on('connected', () => {
            this.connected = true;
        })
    }

    public getConnectedState(){
        return this.connected;
    }
}



