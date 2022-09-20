import { Component, OnInit, HostListener, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { LoginComponent } from '../login/login.component';
import { Book } from '../models/book';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit {

  constructor(private bookService: BookService, private el: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data: Book[])=>{
      this.allbooks = data;
     
      this.allbooks.sort((b1, b2)=>{
        if(b1.timestaken<b2.timestaken){
          return 1;
        }
        if(b1.timestaken>b2.timestaken){
          return -1;
        }
        return 0;
      })
      for (let i=0; i<3; i++){
        this.sortedbooks[i]=this.allbooks[i];
      }
      this.image1= this.sortedbooks[0].img;
      this.image2= this.sortedbooks[1].img;
      this.image3= this.sortedbooks[2].img;
      this.image=this.image1;
     
    })
    this.isRegistered = JSON.parse(localStorage.getItem('registered'));
    
  }

  allbooks: Book[] = [];
  sortedbooks: Book[] = [];
  image1: string;
  image2: string;
  image3: string;
  image: string;

  isRegistered:boolean = false;
  isApproved:boolean = false;
 
  
  imageChanger(img:string){
      this.image=img;  
  }

  logout(){
    localStorage.removeItem('ulogovan');
    localStorage.removeItem('registered');
    localStorage.clear();
    this.router.navigate([""]);
    window.location.reload();
  }
  
  

}
