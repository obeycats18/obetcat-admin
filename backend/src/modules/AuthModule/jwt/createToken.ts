import { IUser } from "../../UserModule/schemas/UserSchema";
import jwt from 'jsonwebtoken'

export default (user:IUser) => {
    
    let token = jwt.sign( 
        {
            data: user._id
        }, 
        process.env.JWT_SECRET || 'secret',
        {
            expiresIn: process.env.TOKEN_AGE,
            algorithm: 'HS256'
        } 
    )


    return token;
}