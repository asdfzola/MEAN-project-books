import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('ulogovan'))
    if(this.user==null) this.router.navigate(['']);

    this.bookService.getAllBooks().subscribe((books: Book[])=>{
      let dan = new Date().getDay()
      dan%=books.length;
      this.book=books[dan];
    })
  }

  book: Book;
  image: string;
  title: string;
  author: string;
  rating: string;
  user: User;
 

  home(){
    this.router.navigate(['']);
  }

  logout(){
    localStorage.removeItem('ulogovan');
    localStorage.removeItem('registered');
    localStorage.clear();
    this.router.navigate(['']);
  }

}
