import express from 'express'
import { ZaduzenjeController } from '../controllers/zaduzenje.controller';

const zaduzenjeRouter = express.Router();

zaduzenjeRouter.route('/getZaduzenje').get(
    (req, res)=> new ZaduzenjeController().getZaduzenje(req,res)
)
zaduzenjeRouter.route('/borrow').post(
    (req, res)=> new ZaduzenjeController().borrow(req, res)
)
zaduzenjeRouter.route('/razduzi').post(
    (req, res)=> new ZaduzenjeController().razduzi(req, res)
)
zaduzenjeRouter.route('/clear').post(
    (req, res)=> new ZaduzenjeController().clear(req, res)
)
zaduzenjeRouter.route('/getAllZaduzenja').get(
    (req, res)=> new ZaduzenjeController().getAllZaduzenja(req, res)
)

zaduzenjeRouter.route('/update').post(
    (req, res)=> new ZaduzenjeController().update(req, res)
)

export default zaduzenjeRouter;