import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { HistoryService } from '../history.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { Zaduzenje } from '../models/zaduzenje';
import { ZaduzenjeService } from '../zaduzenje.service';

@Component({
  selector: 'app-borrowed',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.css']
})
export class BorrowedComponent implements OnInit {

  constructor(private bookService: BookService, private zaduzenjeService: ZaduzenjeService, private router: Router,
              private historyService: HistoryService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("ulogovan"));
    this.zaduzenjeService.getZaduzenje(this.user.username).subscribe((zad: Zaduzenje)=>{
      if(zad==null) { this.have=false; return;}
      this.zaduzenje = zad;
     // console.log(this.zaduzenje.idB[0])
      if(this.zaduzenje.idB.length!=0){
      for(let i=0; i<this.zaduzenje.idB.length; i++){
        this.bookService.getBookById(this.zaduzenje.idB[i]).subscribe((data: Book)=>{
          this.borrowedBooks.push(data); 
          this.rokovi[i]=this.zaduzenje.rok[i]; 
        })
      }
    }else { 
     
      this.have=false
    }
    })
    this.zaduzenjeService.clear(this.user.username).subscribe(resp=>{})
    
  }

  rokovi: Number[] = [];
  have:boolean=true;
  user: User;
  books: Book[] = [];
  borrowedBooks: Book[] = [];
  zaduzenje: Zaduzenje;


  book(book){
    localStorage.setItem('book', JSON.stringify(book))
    this.router.navigate(["book"])
  }

  razduzi(idB, id){
    
    this.zaduzenjeService.razduzi(this.user.username, idB, id).subscribe(resp=>{
      this.historyService.removeHistory(this.user.username, id).subscribe(resp=>{})
      this.bookService.increase(idB).subscribe(resp=>{
        this.ngOnInit()
        window.location.reload();
      })
    }) 
  }

  home(){
    this.router.navigate([''])
}

}
