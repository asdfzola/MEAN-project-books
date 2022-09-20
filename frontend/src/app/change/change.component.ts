import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
    console.log(this.user);
  }

  oldPassword: string;
  newPassword: string;
  cPassword: string;
  user: User;
  
  change(){
    if(this.user.password!=this.oldPassword){ document.getElementById('message').innerHTML="wrong password"; return;}
    if(this.newPassword==null){return;}
    if(this.newPassword==this.oldPassword){ document.getElementById('message1').innerHTML="new password can't be like old one"}
    let regex=/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[!@#$%^&])(?=.*\d)[A-Za-z][a-zA-z0-9!@#$%^&]{7,12}$/;
    if(!this.newPassword.match(regex)){
      document.getElementById("message1").innerHTML="Password must have more then 8 characters, less then 12, atleast one uppercase, one special character(!@#$%^&) and one number, also must start with a letter";
      return;
    }
    
  
    if(this.newPassword!=this.cPassword){ document.getElementById('message2').innerHTML="wrong confirm password"; return;}
    
     this.userService.updatepassword(this.user.username,this.newPassword).subscribe(resp=>{
      localStorage.removeItem('ulogovan');
      localStorage.removeItem('registered');
      localStorage.clear();
      alert("password changed");
      this.router.navigate([""]);
     })
      
  }

  visible:boolean=false;

  showPassword(){
    if(this.visible){
      this.visible=false;
    }else { this.visible=true}
  }

  home(){
    this.router.navigate([""])
  }


}
