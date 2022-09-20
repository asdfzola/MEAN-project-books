import express from 'express'
import { RatingController } from '../controllers/rating.controller';

const ratingRouter = express.Router();

ratingRouter.route('/getRatingById').get(
    (req, res) => new RatingController().getRatingById(req, res)
)

ratingRouter.route('/addComment').post(
    (req, res) => new RatingController().addComment(req, res)
)

export default ratingRouter;