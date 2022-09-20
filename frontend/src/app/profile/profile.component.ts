import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
    console.log(this.user.img)
  }

  user: User;

  home(){
    this.router.navigate([''])
  }

  logout(){
    localStorage.removeItem('ulogovan');
    localStorage.removeItem('registered');
    localStorage.clear();
  
    this.router.navigate([""]);
  }

}
