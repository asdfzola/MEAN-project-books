import express, { Request } from 'express'
import History from '../models/history'

export class HistoryController{
    getHistory = (req: express.Request, res: express.Response)=>{
        let username = req.query.username;

        History.findOne({"username":username}, (err, his)=>{
            if(err) console.log(err)
            else res.json(his);
        })
    }

    addHistory = (req: express.Request, res: express.Response)=>{
        let postoji = req.body.postoji
        let username =req.body.username;
        let idB =req.body.idB
        let datum = new Date()

        if(postoji){

            History.updateOne({'username':username}, {$push:{'idB':idB, 'datumzaduzivanja': datum , 'datumvracanja':null}}, (err, resp)=>{
                if(err) console.log(err)
                else{
                res.json({'message': 'okayeg'})
            }
            })

        }else{
            let history = new History({
                username:req.body.username,
                idB:req.body.idB,
                datumzaduzivanja: new Date(),
                datumvracanja: new Array(null)
            })

            history.save((err, resp)=>{
                if(err) {console.log(err); res.status(400).json({"message":"error"});}
                else res.json({"message":"ok"})
            })

        }
    }

    removeHistory = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
        let id = 'datumvracanja.'+req.body.id;

        History.updateOne({'username':username}, {$set:{[id]:new Date()}}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'ok'})
            } 
        })
    }
}