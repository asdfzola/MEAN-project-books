import express, { Request } from 'express'
import Rating from '../models/rating'

export class RatingController{

    getRatingById = (req: express.Request, res: express.Response)=>{
        let id = req.query.id;

        Rating.findOne({'idB':id}, (err, rat)=>{
            if(err) console.log(err);
            else res.json(rat);
        })
    }

    addComment = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let idB = req.body.idB;
        let username = req.body.username;
        let comment = req.body.comment;
        let ocena = req.body.ocena;
        let datum = new Date();
        if(id){
        Rating.updateOne({'idB':idB}, {$push : {'username':username, 'ocena':ocena, 'text':comment, 'date':datum}}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'okayeg'})
            }
        })
        }else{
        let rating = new Rating({
            idB:req.body.idB,
            username : req.body.username,
            text : req.body.comment,
            ocena: req.body.ocena,
            date: new Date()
        })
        rating.save((err, resp)=>{
            if(err) {console.log(err); res.status(400).json({"message":"error"});}
            else res.json({"message":"ok"})
        })
    }
    }
    

}