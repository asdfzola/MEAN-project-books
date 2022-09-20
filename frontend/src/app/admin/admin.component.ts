import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { Zaduzenje } from '../models/zaduzenje';
import { UserService } from '../user.service';
import { ZaduzenjeService } from '../zaduzenje.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private bookService: BookService, 
    private zaduzenjeService: ZaduzenjeService, private router: Router) { }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe((data: User[])=>{
      this.users=data;
    })
    this.user= JSON.parse(localStorage.getItem('ulogovan'))
 
    if(this.user==null || this.user.type>0) this.router.navigate(['']);
    this.tip=this.user.type;
    

    this.bookService.getAllBooks().subscribe((data: Book[])=>{
      this.books = data;
    })
    
  }
  user:User
  tip:number;
 
  message:string;
  books: Book[] = [];

  users: User[] = [];
  //notapprovedusers: User[] = [];

  approve(username){
    this.userService.approve(username).subscribe(resp=>{
      //alert(resp['message'])
      window.location.reload();
    })
  }

  decline(username){
    this.userService.delete(username).subscribe(resp=>{
     // alert(resp['message'])
     window.location.reload();
    })
  }

  delete(username){
    this.zaduzenjeService.getZaduzenje(username).subscribe((zad: Zaduzenje)=>{
      
      if(zad!=null){
        if(zad.idB.length>0){
         this.message="korisnik ima zaduzenih knjiga";
         alert(this.message)
        }else {
          this.userService.delete(username).subscribe(resp=>{
            // alert(resp['message'])
            window.location.reload();
           })
        }
      }else{
        this.userService.delete(username).subscribe(resp=>{
          // alert(resp['message'])
          window.location.reload();
         })
      }
    })
  }

  deleteBook(idB){
    let b=true;
    this.zaduzenjeService.getAllZaduzenja().subscribe((zads: Zaduzenje[])=>{
      if(zads!=null){
      zads.forEach(element => {
        
        element.idB.forEach(element => {
          if(element==idB) { 
            b=false;
            alert('knjiga je zaduzena i ne moze se obrisati'); 
            
            return;
          }
        });
      });
    }else
      if(b){
        this.bookService.delete(idB).subscribe(resp=>{
          alert('knjiga je obrisana');
          window.location.reload();
        })
      }
    })
  

  }
  

  home(){
    this.router.navigate([''])
  }

  addBook(){
    this.router.navigate(['mod'])
  }

  update(username){
    localStorage.setItem('username',username);
    this.router.navigate(['updateuser'])
  }
  updatebook(book){
    localStorage.setItem('book', JSON.stringify(book))
    this.router.navigate(['book'])
  }

  addUser(){
    this.router.navigate(['adduser']);
  }

  number:number;
  ima:boolean=false;

  addRok(idB){
    
    this.zaduzenjeService.getAllZaduzenja().subscribe((zads: Zaduzenje[])=>{
      if(zads!=null){
      if(this.number==null || this.number==undefined) this.number=14;
      zads.forEach(el => {
        
        for(let i = 0; i<el.idB.length; i++){
          if(idB==el.idB[i]){ 
            this.ima=true;
            // ovde idemo u bazu
           // console.log(el.username, i)
            this.zaduzenjeService.update(el.username, i, this.number).subscribe(resp=>{
             // console.log(resp['message'])
              
            })
          }
        }
        
      });
      if(this.ima){
      alert('rok vracanja knjige promenjen')
      }else alert("knjiga nije zaduzena");
    }
    })
  }

  logout(){
    localStorage.removeItem("ulogovan");
    localStorage.clear();
    this.router.navigate(['']);
  }
}
