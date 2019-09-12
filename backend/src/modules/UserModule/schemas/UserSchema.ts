import mongoose, {Schema}  from 'mongoose'
import {isEmail} from 'validator'
import { Document } from 'mongoose';

import bcrypt from 'bcrypt'

export interface IUser extends Document{
    fullname: string ;
    email: string;
    password: string ;
    role: string ;
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
        required: [true, 'Password is required!'],
        min: 8
    },
    role: {
        type: String,
        required: [true, 'Role is required!']
    },
    photo: {
        type: String
    }
})

UserSchema.pre<IUser>('save', function (next) {

    let saltRounds = 10;
    const user = this;
    
    if(!user.isModified('password')){
        return next();
    }

    
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })

})


export let UserModel = mongoose.model('User', UserSchema);

