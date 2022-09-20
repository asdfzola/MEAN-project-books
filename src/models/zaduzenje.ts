import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zaduzenje = new Schema({
    username:{
        type: String
    },
    idB:{
        type: Array
    },
    rok:{
        type: Array
    }
})

export default mongoose.model("Zaduzenje", Zaduzenje, "zaduzenja")