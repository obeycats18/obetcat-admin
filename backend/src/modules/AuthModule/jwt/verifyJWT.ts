import jwt from 'jsonwebtoken'
import { IUser } from '../../UserModule/schemas/UserSchema';

export default (token: any) => 
    new Promise( (resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || 'secret', (err:any, decodeData:IUser | any ) => {
            if(err || !decodeData) {
                reject(err);
            }
            
            resolve(decodeData)
        })
    } )