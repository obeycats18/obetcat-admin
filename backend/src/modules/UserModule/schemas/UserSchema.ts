import mongoose, {Schema}  from 'mongoose'
import {isEmail} from 'validator'
import { Document } from 'mongoose';

import bcrypt from 'bcrypt'

export interface IUser extends Document{
    last_name: string ;
    first_name: string ;
    email: string;
    password: string ;
    role: string ;
}

let UserSchema = new Schema({
    last_name: {
        type: String,
        required: [true, 'last_name is required!']
    },
    first_name: {
        type: String,
        required: [true, 'first_name is required!']
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
    role: {},
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

