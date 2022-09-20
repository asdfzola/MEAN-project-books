import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Book = new Schema({
    name:{
        type: String
    },
    author:{
        type: String
    },
    timestaken:{
        type: Number
    },
    img:{
        type: String
    },
    rating:{
        type: Number
    }, 
    idB:{
        type: Number
    },
    genre: { 
        type: Array
    },
    publisher: {
        type: String
    },
    language:{ 
        Type: String
    },
    publication:{
        type: String
    },
    number:{
        type: Number
    }
})

export default mongoose.model('Book', Book, 'books')