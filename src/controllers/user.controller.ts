import express, { Request } from 'express'
import User from '../models/user'
import Defaultslike from '../models/defaultslike'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username': username, 'password':password}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user)
        })

    }

    register = (req: express.Request, res: express.Response)=>{
        let user = new User({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            type: 2,
            registered: true,
            approved: false,
            img: req.body.img
        })

        user.save((err, resp)=>{
            if(err) {console.log(err); res.status(400).json({"message":"error"});}
            else res.json({"message":"ok"})
        })
    }

    sameusername = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        User.findOne({'username': username}, (err, user)=>{
            if(err)  console.log(err)
            else res.json(user)
        })

    }
    sameemail = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;

        User.findOne({'email': email}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user)
        })

    }

    getAllUsers = (req: express.Request, res:express.Response)=>{
        User.find({$or:[{"type":2},{'type':1}]}, (err, users)=>{
            if(err) console.log(err)
            else res.json(users);
        })
    }

    approve = (req: express.Request, res:express.Response)=>{
        let username = req.body.username;

        User.updateOne({'username':username}, {'approved': true}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'ok'})
            }
        })
    }

    delete = (req: express.Request, res:express.Response)=>{
        let username = req.body.username;

        User.deleteOne({'username':username},(err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'ok'})
            }
        })
    }

    updatepassword = (req: express.Request, res:express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        User.updateOne({'username':username},{'password':password}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message':'ok'});
        })
    }

    getUser = (req: express.Request, res:express.Response)=>{
        let username=req.query.username;

        User.findOne({'username':username}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user)
        })
    }

    update = (req: express.Request, res:express.Response)=>{
        let oldusername=req.body.oldusername;
        let firstname=req.body.firstname;
        let lastname=req.body.lastname;
        let username=req.body.username;
        let password=req.body.password;
        let email=req.body.email;
        let address=req.body.address;
        let type=req.body.type;
        let phone=req.body.phone;
        let img = req.body.img;

        User.updateOne({'username':oldusername},{'username':username, 'password':password, 'firstname':firstname,
        'lastname':lastname, 'email':email,'address':address,'phone':phone,'type':type, 'img':img} , (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message':'ok'})
        })
    }

    addUser = (req: express.Request, res: express.Response)=>{
        let user = new User({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            type: req.body.type,
            registered: true,
            approved: true,
            img: req.body.img
        })

        user.save((err, resp)=>{
            if(err) {console.log(err); res.status(400).json({"message":"error"});}
            else res.json({"message":"ok"})
        })
    }

    getDefaultUserPicture=(req:express.Request, res:express.Response)=>{

        Defaultslike.findOne({'name':'user'}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

}