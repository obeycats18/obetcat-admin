import bctypt, { hash } from 'bcrypt'

export let hashPassword = (password:string) => {
    let saltRounds = 10;
    
    bctypt.genSalt(saltRounds)
        .then( salt => {
            bctypt.hash(password, salt)
                .then( hash => {return hash})
        });
    

}