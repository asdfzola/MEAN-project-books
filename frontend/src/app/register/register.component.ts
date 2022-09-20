import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Default } from '../models/defaultslika';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.user= new User();
  
  }

  username:string;
  password:string;
  cpassword:string;
  firstname:string;
  lastname:string;
  email:string;
  phone:string;
  address:string;


  user: User;
 
  
  message:string;
  message1:string;
  message2:string;
  message3:string;
  message4:string;
  message5:string;
  message6:string;
  
  register(){
    
    
    //if(this.password==null || this.username==''){ this.message2='required'; return;}
    if(this.firstname==null || this.firstname==''){ this.message3='required'; return;}
    if(this.lastname==null || this.lastname==''){ this.message4='required'; return;}
    if(this.username==null || this.username==''){ this.message1='required'; return;}
    if(this.email==null || this.email==''){ this.message5='required'; return;}

    if(this.password!= this.cpassword){ this.message6='wrong confirm password'; return;}

    if(this.password=='') {document.getElementById('message').innerHTML='password is required'; return;}
   
      let regex=/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[!@#$%^&])(?=.*\d)[A-Za-z][a-zA-z0-9!@#$%^&]{7,12}$/;
     
      if(!this.password.match(regex)){
        document.getElementById("message").innerHTML="Passwrod must have more then 8 characters, less then 12, atleast one uppercase, one special character(!@#$%^&) and one number, also to start with letter";
        return;
      }

      let emailreg=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if(!this.email.match(emailreg)){
        document.getElementById("message").innerHTML="email must be in email format (example@example.com)";
        return;
      }

    this.userService.sameemail(this.email).subscribe((u:User)=>{
        if(u!=null) {this.message5='email already taken'; return; }
      
    
    this.userService.sameusername(this.username).subscribe((u: User)=>{  
      if(u!=null && u.username==this.username){
        this.message1='username already taken';
        return;
      }else{
        
        if(this.image=="" || this.image==null || this.image==undefined){
          this.userService.getDefaultUserPicture().subscribe((data: Default)=>{
            this.image=data.img;
          this.userService.register(this.username,this.password, 
          this.firstname, this.lastname, 
          this.email, this.phone, 
          this.address, this.image).subscribe(resp=>{
          if(resp['message']=='ok'){
              this.message='request sent';
              alert("request sent")
              this.router.navigate(['']);
            }else{
                this.message='error';
            }
      
          })
        })
        }else{
          this.userService.register(this.username,this.password, 
            this.firstname, this.lastname, 
            this.email, this.phone, 
            this.address, this.image).subscribe(resp=>{
            if(resp['message']=='ok'){
                this.message='request sent';
                alert("request sent")
                this.router.navigate(['']);
              }else{
                  this.message='error';
              }
        
            })
        }
        }
      })
    })
  } 

  visible:boolean=false;

  showPassword(){
    if(this.visible){
      this.visible=false;
    }else { this.visible=true}
  }

  image:any;

  onFileSelected(event) {
   let input = event.target;
   if(input.files && input.files[0]) {
    let reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onloadend = (e) =>{
      this.image = reader.result;
    }
   }
  }


}
