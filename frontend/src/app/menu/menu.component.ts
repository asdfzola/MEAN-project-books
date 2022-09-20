import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isRegistered=JSON.parse(localStorage.getItem("registered"));
    this.user = JSON.parse(localStorage.getItem("ulogovan"))
  }
 
  isRegistered: boolean=false;
  user: User

  logout(){
    localStorage.removeItem('ulogovan');
    localStorage.removeItem('registered');
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['']);
  }
  profile(){
    this.router.navigate(['profile'])
  }

}
