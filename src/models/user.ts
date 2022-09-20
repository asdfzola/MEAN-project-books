import { Binary } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    address:{
        type: String
    },
    type:{
        type: Number   //0-admin, 1-moderator, 2-user
    },
    phone:{
        type: String
    },
    img:{
        type: String
    },
    registered:{
        type: Boolean
    },
    approved:{
        type: Boolean
        
    }
})

export default mongoose.model('User', User, 'users')