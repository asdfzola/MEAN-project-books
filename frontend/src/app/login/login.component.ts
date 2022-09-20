import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username1: string;
  password1: string;
  messagee: string;
  

  login(){

    this.userService.login(this.username1, this.password1).subscribe((user: User)=>{
      if(user!=null){
        if(!user.approved){ this.messagee='user is not approved by admin'}
        else{
            localStorage.setItem('ulogovan', JSON.stringify(user))
            localStorage.setItem('registered', "true");
            if(user.type == 0){
              this.router.navigate(['admin']);
            }else if(user.type==1){
               this.router.navigate(['']);
            }else{
                this.router.navigate(['user'])
            }
        }
      }else {
        this.messagee='pogresan username ili password';
      }


    })  
  }

  back(){
    this.router.navigate([''])
  }

  scroll(el: HTMLElement){
    el.scrollIntoView({behavior: "smooth"})
  }

}
