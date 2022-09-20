import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem('ulogovan'))
  }

  username: string;
  password: string;
  message: string;
  user: User;

  login(){

    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(user!=null){
        if(user.type==1 || user.type==2){
          this.message="user is not admin";
        }else {
        localStorage.setItem('ulogovan', JSON.stringify(user))
        if(user.type == 0){
          this.router.navigate(['admin']); 
          }
        }
      }else {
        this.message='pogresan username ili password';
      }
    })  
  }

  back(){
    this.router.navigate([''])
  }

}
