import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Default } from '../models/defaultslika';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem('ulogovan'))
    if(this.user==null || this.user.type>0) this.router.navigate(['']);
    this.tip=this.user.type;
    this.userService.getAllUsers().subscribe((data: User[])=>{

      for(let i = 0; i<data.length; i++){
        this.users[i]=data[i]
      }
    })
      
 
  }


  user:User;
  tip:number;
  users:User[]=[];


  visible:boolean;

  firstname:string;
  lastname:string;
  username:string;
  password:string;
  email:string;
  phone:string;
  address:string;
  image:any;
  type:number;
  message:string;
  message2:string;

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

  register(){
    this.users.forEach(element => {
      if(this.username==element.username){
        this.message='username je vec iskorsicen'; 
        alert(this.message); 
        window.location.reload();
        return;
      }
    });
    this.users.forEach(element => {
      if(this.email==element.email){
        this.message2='email je vec iskorsicen'; 
        alert(this.message2); 
        window.location.reload();
        return;
      }
    });

    if(this.image=="" || this.image==null || this.image==undefined){
      this.userService.getDefaultUserPicture().subscribe((data: Default)=>{
        this.image=data.img;

        this.userService.addUser(this.firstname,this.lastname,this.username,this.password,this.email
                            ,this.address,this.type,this.phone,this.image).subscribe(resp=>{
                              alert("korisnik dodat")
                              window.location.reload();
                            })
                          })
      }else{
        this.userService.addUser(this.firstname,this.lastname,this.username,this.password,this.email
          ,this.address,this.type,this.phone,this.image).subscribe(resp=>{
                              alert("korisnik dodat")
                              window.location.reload();
          })
      }

  }

  showPassword(){
    if(this.visible){
      this.visible=false;
    }else { this.visible=true}
  }

}
