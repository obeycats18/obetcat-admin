import mongoose from 'mongoose'
import UserSchema from '../schemas/UserSchema';

export let UserModel = mongoose.model('User', UserSchema);