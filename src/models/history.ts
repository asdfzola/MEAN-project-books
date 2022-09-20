import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let History = new Schema({
    username:{
        type: String
    },
    idB:{
        type: Array
    },
    datumzaduzivanja:{
        type: Array
    },
    datumvracanja:{
        type: Array
    }
})

export default mongoose.model("History", History, "history")