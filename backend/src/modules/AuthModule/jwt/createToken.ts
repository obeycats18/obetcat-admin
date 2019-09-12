import { IUser } from "../../UserModule/schemas/UserSchema";
import jwt from 'jsonwebtoken'
import {reduce} from 'lodash'

export default (user:IUser) => {
    
    let token = jwt.sign( 
        {
            data: reduce(user, (result:any, value, key) => {
                if(key !== 'password'){
                    result[key] = value
                }
                
                return result
            }, {} )
        }, 
        process.env.JWT_SECRET || 'secret',
        {
            expiresIn: process.env.TOKEN_AGE,
            algorithm: 'HS256'
        } 
    )

    return token;
}