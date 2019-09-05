import mongoose, {Schema}  from 'mongoose'
import {isEmail} from 'validator'


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

let UserModel = mongoose.model('User', UserSchema);

export default UserModel;