import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { HistoryService } from '../history.service';
import { Book } from '../models/book';
import { Default } from '../models/defaultslika';
import { History } from '../models/history';
import { Rating } from '../models/rating';
import { User } from '../models/user';
import { Zaduzenje } from '../models/zaduzenje';
import { RatingService } from '../rating.service';
import { ZaduzenjeService } from '../zaduzenje.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router,
     private zaduzenjaService: ZaduzenjeService, private ratingService: RatingService,
     private historyService: HistoryService) { }

  ngOnInit(): void {
    this.book=JSON.parse(localStorage.getItem('book'))
    this.user=JSON.parse(localStorage.getItem('ulogovan'))
    if(this.user.type==1 || this.user.type==0) (this.mod=true);

    this.historyService.getHistory(this.user.username).subscribe((data: History)=>{
      if(data!=null){
        this.history=true;
      }else {this.history=false}
    })


   this.ratingService.getRating(this.book.idB).subscribe((rat: Rating)=>{
    
      if(rat!=null) { 
      this.rating=rat;
      let sum=0;
      for(let i=0; i<this.rating.ocena.length; i++){
        sum+=this.rating.ocena[i];
      }
        this.avg= Math.round((sum/this.rating.ocena.length)*100) /100;
        this.bookService.updaterating(this.book.idB, this.avg).subscribe(resp=>{})
      }else{
        this.postoji=false;
        this.message1="nema komentara i ocena"
      }
      
    //console.log(this.message1)
    })

    
  }

  history: boolean=true;
  numberofbooks:number;
  books:Book[]=[];
  book:Book;
  user: User;
  zaduzi:boolean=false;
  message:string;
  message1:string;
  message2:string;
  message3:string;
  message4:string;
  message5:string;
  rating: Rating;
  avg: number;
  postoji: boolean=true;
  postoji1:boolean=true;
  comment: string;
  ocena:number;
  mod:boolean=false;
  azuriraj:boolean=false;
  i:number=0;
  
  
  borrow(idB){
    this.zaduzenjaService.getZaduzenje(this.user.username).subscribe((zad: Zaduzenje)=>{
      
      if(zad!=null){
       if(zad.idB.length<3 && zad.idB.length>0){
        
         for(let i=0; i<zad.idB.length; i++){
          
            if(this.book.idB!=zad.idB[i] && this.book.number>0){
             
              this.zaduzi=true;
            }else if(this.book.idB==zad.idB[i]){ 
              this.zaduzi=false
              this.i=2
            }
          }
          for(let i=0; i<zad.idB.length; i++){
            if(zad.rok[i]<0){
              this.zaduzi=false;
              this.i=1
            }
            console.log(this.book.idB)
          }
        }else if(zad.idB.length>=3) {
          this.i=3;
          this.zaduzi=false;
        }else if(zad.idB.length==0){
          this.zaduzi=true;
        }
      }else{
        if(this.book.number>0) {
            this.zaduzi=true;
        }else this.i=4;

        this.postoji1=false;
      }
   

    if(this.zaduzi){
    this.zaduzenjaService.borrow(this.postoji1, idB, this.user.username).subscribe(resp=>{

        this.bookService.decrease(idB).subscribe(response=>{});
        this.bookService.timestaken(idB).subscribe(resp=>{})
        this.historyService.addHistory(this.history, this.user.username, idB).subscribe(resp=>{
          //console.log(resp['message']);
        });

        alert("knjiga zaduzena");
        localStorage.removeItem('book')
        this.router.navigate([''])
      
    })
     }else { 
      if(this.i==1){
        this.message="kasnite sa rokom vracanja neke knjige"
      } else if(this.i==2){
        this.message5='vec ste zaduzili ovu knjigu'
      } else if(this.i==3){ this.message4='vec ste zaduzili 3 knjige';}
        else if(this.i==4){ this.message4='nema dovoljno knjiga na stanju'}
      }

    })
  }

  addComment(){
    if(this.rating!=null){
    for(let i=0; i<this.rating.username.length; i++){
      if(this.rating.username[i]==this.user.username){
        this.message2="korisnik je vec ocenio i dodao komentar.";
        return;
      }
    }
  }
  if(this.comment==null || this.comment=="" || this.ocena==null) { this.message3="unesite sva polja"; return;}
 
  
     this.ratingService.addComment(this.postoji,this.book.idB, this.user.username, this.ocena, this.comment).subscribe(resp=>{
        window.location.reload();
      })
    

  }

  name:string;
  author:string;
  genre: Array<string> = [];
  publisher:string;
  publication:string;
  language:string;
  number: number;
  img:any;

  onFileSelected(event) {
    
   let input = event.target;
   if(input.files && input.files[0]) {
    let reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onloadend = (e) =>{
      this.img = reader.result;
    }
   }
  }

  azur(){
    this.azuriraj=true;
  }

  update(){
  
    if(this.img==null || this.img=="" || this.img==undefined) {
      this.bookService.getDefaultBookPicture().subscribe((data: Default)=>{
        this.img=data.img;
                this.bookService.update(this.book.idB, this.name, this.author, this.genre, this.publisher, this.publication,
                            this.language, this.number, this.img).subscribe(resp=>{
                              
                              this.bookService.getBookById(this.book.idB).subscribe((book: Book)=>{
                                localStorage.removeItem('book')
                                localStorage.setItem('book', JSON.stringify(book))
                              })

                               window.location.reload()
                              })
        })
    }else{
      this.bookService.update(this.book.idB, this.name, this.author, this.genre, this.publisher, this.publication,
        this.language, this.number, this.img).subscribe(resp=>{
          
          this.bookService.getBookById(this.book.idB).subscribe((book: Book)=>{
            localStorage.removeItem('book')
            localStorage.setItem('book', JSON.stringify(book))
          })

           window.location.reload()
          })
    }
  
  }


  dodaj(){
    this.router.navigate(['mod'])
  }
  
}
