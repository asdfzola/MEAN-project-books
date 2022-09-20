import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Defaultslike = new Schema({
    name:{
        type:String
    },
    img:{
        type:String
    }
})

export default mongoose.model('Defaultslike', Defaultslike, 'defaultslike')