import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { HistoryService } from '../history.service';
import { Book } from '../models/book';
import { History } from '../models/history';
import { User } from '../models/user';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private historyService: HistoryService, private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'))

    this.historyService.getHistory(this.user.username).subscribe((his: History)=>{
      if(his==null) return;
      this.history=his;

      if(this.history.idB.length!=0){
       
        for(let i=0; i<this.history.idB.length; i++){
          this.bookService.getBookById(this.history.idB[i]).subscribe((book:Book)=>{
           //this.books.push(book);
           this.books[i] = new Book(book.name,book.author,book.timestaken,book.img,book.rating,
            book.idB,book.genre,book.publisher,book.language,book.publication)
           this.books[i].datumzaduzivanja=this.history.datumzaduzivanja[i]
            if(this.history.datumvracanja!=null)
            {
              this.books[i].datumvracanja=this.history.datumvracanja[i]
            }
          })
        }
      
      }else{
        this.have=false;
      }
      
    })
  }

  user: User;
  history: History;
  have: boolean = true;
  books: Book[] = [];
  dir: string = 'asc';

  book(book){
    localStorage.setItem('book', JSON.stringify(book))
    this.router.navigate(["book"])
  }

  sortByName(){
    if(this.dir=='asc'){
    this.books.sort((b1, b2)=>{
      if(b1.name<b2.name){
        return 1;
      }
      if(b1.name>b2.name){
        return -1;
      }
      return 0;
    })
    this.dir='dsc'
    }else if(this.dir='dsc'){
      this.books.sort((b1, b2)=>{
        if(b1.name>b2.name){
          return 1;
        }
        if(b1.name<b2.name){
          return -1;
        }
        return 0;
      })
      this.dir='asc'
    }
  }

  sortByDate(){
    if(this.dir=='asc'){
    this.books.sort((b1, b2)=>{
      if(b1.datumvracanja<b2.datumvracanja){
        return 1;
      }
      if(b1.datumvracanja>b2.datumvracanja){
        return -1;
      }
      return 0;
    })
    this.dir='dsc'
    }else if(this.dir=='dsc') {
      this.books.sort((b1, b2)=>{
        if(b1.datumvracanja>b2.datumvracanja){
          return 1;
        }
        if(b1.datumvracanja<b2.datumvracanja){
          return -1;
        }
        return 0;
      })
      this.dir='asc'
    }
  }

  sortByDate1(){
    if(this.dir=='asc'){
    this.books.sort((b1, b2)=>{
      if(b1.datumzaduzivanja<b2.datumzaduzivanja){
        return 1;
      }
      if(b1.datumzaduzivanja>b2.datumzaduzivanja){
        return -1;
      }
      return 0;
    })
    this.dir='dsc'
    }else if(this.dir=='dsc') {
      this.books.sort((b1, b2)=>{
        if(b1.datumzaduzivanja>b2.datumzaduzivanja){
          return 1;
        }
        if(b1.datumzaduzivanja<b2.datumzaduzivanja){
          return -1;
        }
        return 0;
      })
      this.dir='asc'
    }
  }

  sortByAuthors(){
      if(this.dir=='asc'){
      this.books.sort((b1, b2)=>{
        if(b1.author<b2.author){
          return 1;
        }
        if(b1.author>b2.author){
          return -1;
        }
        return 0;
      })
      this.dir='dsc'
      }else if(this.dir=='dsc') {
        this.books.sort((b1, b2)=>{
          if(b1.author>b2.author){
            return 1;
          }
          if(b1.author<b2.author){
            return -1;
          }
          return 0;
        })
        this.dir='asc'
      }
    
  }

  home(){
    this.router.navigate([""])
  }

}
