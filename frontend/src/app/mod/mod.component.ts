import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { Default } from '../models/defaultslika';
import { User } from '../models/user';

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css']
})
export class ModComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('ulogovan'))
    if(this.user==null || this.user.type>1) this.router.navigate(['']);
  }

  name:string;
  author:string;
  genre:Array<string>;
  publisher:string;
  publication:string;
  language:string;
  number:number;
  user: User
  

  addBook(){
    let id=0;
    this.bookService.getAllBooks().subscribe((books: Book[])=>{

      if(books==null) return;
      books.sort((b1, b2)=>{
        if(b1.idB>b2.idB){
          return 1;
        }
        if(b1.idB<b2.idB){
          return -1;
        }
        return 0;
      })
      console.log(books)
      books.forEach(element => {
            if(id==element.idB) id++
      });

      if(this.name=='' || this.name==null || this.author=='' || this.genre==null || this.publisher=='') {return;}
    
      
      if(this.image==null || this.image=="" || this.image==undefined) {
        this.bookService.getDefaultBookPicture().subscribe((data: Default)=>{
          this.image=data.img;
                  
            this.bookService.addBook(id, this.name, this.author, this.genre, 
              this.publisher, this.publication, this.language, this.number, this.image, null).subscribe(resp=>{
                if(resp['message']=='ok'){
                    alert("book added");
                    window.location.reload();
                       }
            })
          })
        }else{
          this.bookService.addBook(id, this.name, this.author, this.genre, 
            this.publisher, this.publication, this.language, this.number, this.image, null).subscribe(resp=>{
              if(resp['message']=='ok'){
                  alert("book added");
                  window.location.reload();
                     }
          })
        }
      
    })
  }

  image:any;

  onFileSelected(event) {
   let input = event.target;
   if(input.files && input.files[0]) {
    let reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onloadend = (e) =>{
      this.image = reader.result;
      console.log(this.image)
    }
   }
  }
}
