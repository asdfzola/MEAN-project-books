import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.isRegistered=JSON.parse(localStorage.getItem('registered'));
  }

  books: Book[]=[];
  searchParam: string;
  isRegistered: boolean = false;
  show:boolean=false;

  search(){
    this.bookService.searchBooks(this.searchParam).subscribe((data: Book[])=>{
      this.books=data;
      if(this.books.length>0) this.show=true;
    })
    //console.log(localStorage.getItem('book'))
  }

  
  gotobook(book){
    if(this.isRegistered){
    localStorage.setItem('book', JSON.stringify(book));
    this.router.navigate(['book']);
    }else return;
  }

  

  home(){
      this.router.navigate([''])
  }
  
}
