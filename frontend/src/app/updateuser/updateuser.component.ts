import { Component, OnInit } from '@angular/core';
import { Default } from '../models/defaultslika';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.username1=localStorage.getItem('username');

    this.userService.getAllUsers().subscribe((data: User[])=>{
      //this.users=data;

      for(let i = 0; i<data.length; i++){
        this.users[i]=data[i]
      }
      
      
    })
//????????????????????????????????
  /*  this.userService.getUser(this.username1).subscribe((data: User)=>{
      this.user=data;
    })

    console.log(this.user)
    */
  }

  users: User[] = [];
  user: User
  
  username1:string;
  
  img:any;
  username:string;
  password:string;
  firstname:string;
  lastname:string;
  email:string;
  phone:string;
  address:string;
  type:number;
  message:string;
  message2:string;

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

   update(){
    if(this.type<0 || this.type>2){ alert("tip mora biti 0,1 ili 2"); window.location.reload(); return;}

    if(this.img=="" || this.img==null || this.img==undefined){
      this.userService.getDefaultUserPicture().subscribe((data: Default)=>{
        this.img=data.img;

    this.userService.update(this.username1,this.username,this.password,this.firstname,
      this.lastname,this.email,this.address,this.type,this.phone,this.img).subscribe(resp=>{
        alert("korisnik promenjen/default slika")
        window.location.reload()
      })
    })
    }else{
      this.userService.update(this.username1,this.username,this.password,this.firstname,
        this.lastname,this.email,this.address,this.type,this.phone,this.img).subscribe(resp=>{
          alert(resp['korisnik promenjen'])
          window.location.reload()
        })

    }
  }

}


