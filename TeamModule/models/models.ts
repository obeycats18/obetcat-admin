import mongoose from 'mongoose'

import { TeamSchema } from '../schemes/TeamModel';

export let TeamModel = mongoose.model('Teams', TeamSchema);

