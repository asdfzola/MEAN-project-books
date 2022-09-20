import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=> new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=> new UserController().register(req, res)
)
userRouter.route('/sameusername').post(
    (req, res)=> new UserController().sameusername(req, res)
)

userRouter.route('/sameemail').post(
    (req, res)=> new UserController().sameemail(req, res)
)

userRouter.route('/getAllUsers').get(
    (req, res)=> new UserController().getAllUsers(req, res)
)

userRouter.route('/approve').post(
    (req, res)=> new UserController().approve(req, res)
)

userRouter.route('/delete').post(
    (req, res)=> new UserController().delete(req, res)
)

userRouter.route('/updatepassword').post(
    (req, res)=> new UserController().updatepassword(req, res)
)

userRouter.route('/getUser').get(
    (req, res)=> new UserController().getUser(req, res)
)
userRouter.route('/update').post(
    (req, res)=> new UserController().update(req, res)
)
userRouter.route('/getDefaultUserPicture').get(
    (req, res)=> new UserController().getDefaultUserPicture(req,res)
)
userRouter.route('/addUser').post(
    (req,res)=> new UserController().addUser(req, res)
)

export default userRouter;