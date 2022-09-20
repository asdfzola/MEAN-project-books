import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rating = new Schema({
    idB:{
        type: Number
    },
    username:{
        type: Array
    },
    ocena:{
        type: Array
    },
    text:{
        type: Array
    },
    date:{
        type: Array<Date>
    }
})

export default mongoose.model('Rating', Rating, 'ratings')