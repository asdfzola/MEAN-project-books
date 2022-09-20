import express from 'express'
import { BookController } from '../controllers/book.controller';

const bookRouter = express.Router();

bookRouter.route('/getAllBooks').get(
    (req, res)=> new BookController().getAllBooks(req, res)
)

bookRouter.route('/searchBooks').get(
    (req, res)=> new BookController().searchBooks(req, res)
)

bookRouter.route('/getBookById').get(
    (req, res)=> new BookController().getBookById(req, res)
)
bookRouter.route('/decrease').post(
    (req, res)=> new BookController().decrease(req, res)
)
bookRouter.route('/increase').post(
    (req, res)=> new BookController().increase(req, res)
)
bookRouter.route('/update').post(
    (req, res)=> new BookController().update(req, res)
)
bookRouter.route('/updaterating').post(
    (req, res)=> new BookController().updaterating(req, res)
)
 bookRouter.route('/addBook').post(
    (req, res)=> new BookController().addBook(req, res)
 )
 bookRouter.route('/timestaken').post(
    (req, res)=> new BookController().timestaken(req, res)
)
bookRouter.route('/getDefaultBookPicture').get(
    (req, res)=> new BookController().getDefaultBookPicture(req,res)
)
bookRouter.route('/delete').post(
    (req, res)=> new BookController().delete(req, res)
)

export default bookRouter;
