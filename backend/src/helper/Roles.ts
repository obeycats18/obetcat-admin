// import mongoose, {Schema}  from 'mongoose'
// import { Document } from 'mongoose';

// // export interface IUser extends Document{
// //     last_name: string ;
// //     first_name: string ;
// //     email: string;
// //     password: string ;
// //     role: string ;
// // }

// let RoleSchema = new Schema({
//     role: {
//         type: String,
//         required: [true, 'last_name is required!']
//     },
//     do: [{
//         type: String,
//         required: [true, 'last_name is required!']
//     }]
// })

// export default RoleSchema

export let Roles = [
    {
        name: 'team_lead',
        do: ['create_project', 'edit_project', 'add_board', 'add_sprint', 'add_backlog', 'add_edits']
    },
    {
        name: 'project_manager',
        do: ['create_project', 'edit_project', 'add_board', 'add_sprint', 'add_backlog', 'add_edits']
    },
    {
        name: 'developer',
        do: ['add_sprint', 'add_backlog', 'update_status_task']
    },
    {
        name: 'client',
        do: ['get_project', 'call_developer']
    },
]

export const getRole = (name:string) => {
   
    return Roles.find(item => name === item.name)
}
