import jwt from 'jsonwebtoken'

export default (token: any) => 
    new Promise( (resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || 'secret', (err:any, decodeData: any ) => {
            if(err || !decodeData) {
                reject(err);
            }
            resolve(decodeData)
        })
    } )