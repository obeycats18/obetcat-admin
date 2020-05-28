import { IUser } from '../../UserModule/schemas/UserSchema';

import {Schema, Document}  from 'mongoose'

export interface ITeams extends Document {
    name?: string
    members: Array<IUser>
}

export let TeamSchema: Schema = new Schema({
    name: {
        type: String
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});



