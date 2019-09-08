import mongoose, {Schema}  from 'mongoose'
import {isEmail} from 'validator'

import bcrypt from 'bcrypt'

const saltRound = 10;

export interface IUser extends mongoose.Document{
    fullname: string;
    email: string;
    password: string;
    role: string;
}

let UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname is required!']
    },
    email: {
        type: String,
        enique: true,
        required: [true, 'Email is required!'],
        validate: [isEmail, 'Incorret email']
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    role: {
        type: String,
        required: [true, 'Role is required!']
    }
})

export let UserModel = mongoose.model('User', UserSchema);

// UserSchema.pre<IUser>('save', function(next) {

//     let saltRounds = 10;

//     if(!this.isModified('password')){
//         return next();
//     }
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//         if(err) return next(err);

//         bcrypt.hash(this.password, salt, (err, hash) => {
//             if(err) return next(err);

//             this.password = hash;
//             next();
//         })
//     })

// })
