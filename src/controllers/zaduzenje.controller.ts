import express, { Request } from 'express'
import Zaduzenje from '../models/zaduzenje'

export class ZaduzenjeController{

    getAllZaduzenja = (req: express.Request, res: express.Response)=>{
         Zaduzenje.find({}, (err, zad)=>{
            if(err) console.log(err)
            else res.json(zad);
        })
    }

    getZaduzenje = (req: express.Request, res: express.Response)=>{
        let username = req.query.username;

        Zaduzenje.findOne({"username":username}, (err, zad)=>{
            if(err) console.log(err)
            else res.json(zad);
        })
    }

    borrow = (req: express.Request, res:express.Response)=>{
        let postoji=req.body.postoji;
        let idB=req.body.idB;
        let username=req.body.username;
        if(postoji){
        Zaduzenje.updateOne({'username':username}, {$push : {'idB':idB, 'rok':14}}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'okayeg'})
            }
        })
        }else{
            let zaduzenje = new Zaduzenje({
                username: username,
                idB: idB,
                rok: 14
            })
            zaduzenje.save((err, resp)=>{
                if(err) {console.log(err); res.status(400).json({"message":"error"});}
                else res.json({"message":"ok"})
            })
        }
    }

    razduzi = (req: express.Request, res:express.Response)=>{
        let username=req.body.username;
        let idB=req.body.idB;
        let id='rok.'+req.body.id;
        
        Zaduzenje.updateOne({'username':username}, {$pull:{'idB':idB}, $unset:{[id]:1}}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'ok'})
            } 
        })
       
    }
    
    clear = (req: express.Request, res: express.Response)=>{
        let username=req.body.username
         
        Zaduzenje.updateOne({'username':username}, {$pull:{'rok':null}}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'ok'})
            } 
        })
    }

    update = (req: express.Request, res: express.Response)=>{
        let number=req.body.number;
        let username=req.body.username;
        let i = 'rok.'+req.body.i;
        
        Zaduzenje.updateOne({'username':username},{$set:{[i]:number}} ,(err, rspe)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'ok'})
            } 
        })
    }
}