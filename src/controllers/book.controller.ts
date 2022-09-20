import express, { Request } from 'express'
import Defaultslike from '../models/defaultslike'
import Book from '../models/book'

export class BookController{
    getAllBooks = (req:express.Request, res:express.Response)=>{

        Book.find({}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })

    }

    searchBooks = (req: express.Request, res:express.Response)=>{
        let searchParam = req.query.param; // query jer za get saljemo parametre...
        
        Book.find({$or:[{'name': {$regex: searchParam, $options: 'i'}}, {'author': {$regex: searchParam, $options: 'i'}}]}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })
    }

    getBookById = (req: express.Request, res:express.Response)=>{
        let id = req.query.id;

        Book.findOne({'idB':id}, (err, book)=>{
            if(err) console.log(err)
            else res.json(book)
        })
    }

    decrease = (req: express.Request, res:express.Response)=>{
        let id = req.body.idB;
     
        Book.updateOne({'idB':id}, {$inc:{'number':-1}}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'ok'})
            }
        })
    }
    
    increase = (req: express.Request, res:express.Response)=>{
        let id = req.body.idB;
     
        Book.updateOne({'idB':id}, {$inc:{'number':1}}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'ok'})
            }
        })
    }

    timestaken = (req: express.Request, res:express.Response)=>{
        let id = req.body.idB;
     
        Book.updateOne({'idB':id}, {$inc:{'timestaken':1}}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'ok'})
            }
        })
    }

    update = (req:express.Request, res:express.Response)=>{
        let idB=req.body.idB;
        let name=req.body.name;
        let author=req.body.author;
        let genre=req.body.genre;
        let publisher=req.body.publisher;
        let publication=req.body.publication;
        let language=req.body.language;
        let number=req.body.nubmer;
        let img = req.body.img;

        Book.updateOne({'idB':idB},{'name':name, 'author':author, 'genre':genre, 'publisher':publisher, 
                        'publication':publication, 'language':language, 'number':number, 'img':img}, (err, resp)=>{
                            if(err) console.log(err)
                            else res.json({'message':'ok'})
                        })
    }

    updaterating = (req: express.Request, res:express.Response)=>{
        let id = req.body.idB;
        let avg=req.body.avg;
     
        Book.updateOne({'idB':id}, {'rating':avg}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'ok'})
            }
        })
    }

    addBook = (req:express.Request, res:express.Response)=>{
        let book= new Book({
        name : req.body.name,
        author : req.body.author,
        timestaken:0,
        img:req.body.img,
        rating:req.body.rating,
        idB :req.body.idB,
        genre : req.body.genre,
        publisher : req.body.publisher,
        language : req.body.language,
        publication : req.body.publication,
        number : req.body.number
        })

        book.save((err, resp)=>{
            if(err) {console.log(err); res.status(400).json({"message":"error"});}
            else res.json({"message":"ok"})
        })

        /*try{
        Book.insertOne([{'idB':idB, 'name':name, 'author':author, 'genre':genre, 'publisher':publisher,
                        'publication':publication, 'language':language, 'number':number, 'timestaken':null,
                        'rating':null, 'img':null}, (err, resp)=>{
                            if(err) console.log(err);
                            else{
                                res.json({'message':'ok'})
                            }
                        }])
                    }catch (e){ console.log(e);} */
    }

    getDefaultBookPicture=(req:express.Request, res:express.Response)=>{

        Defaultslike.findOne({'name':'book'}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    delete = (req:express.Request, res:express.Response)=>{
            let idB=req.body.idB;

            Book.deleteOne({'idB':idB}, (err, resp)=>{
                if(err) console.log(err)
                else res.json(resp)
            })
    }
}