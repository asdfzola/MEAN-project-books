import express from 'express'
import { HistoryController } from '../controllers/history.controller';

const historyRouter = express.Router();

historyRouter.route('/getHistory').get(
    (req, res)=> new HistoryController().getHistory(req, res)
)

historyRouter.route('/addHistory').post(
    (req, res)=> new HistoryController().addHistory(req, res)
)
historyRouter.route('/removeHistory').post(
    (req, res)=> new HistoryController().removeHistory(req, res)
)



export default historyRouter;