import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.router';
import bookRouter from './routers/book.router';
import zaduzenjeRouter from './routers/zaduzenje.router';
import historyRouter from './routers/history.router';
import ratingRouter from './routers/rating.router';


const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/piaprojekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('mongo ok')
})

const router = express.Router()
router.use('/users', userRouter)
router.use('/books', bookRouter)
router.use('/zaduzenja', zaduzenjeRouter)
router.use('/history', historyRouter)
router.use('/ratings', ratingRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));
