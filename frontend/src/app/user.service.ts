import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'
  

  login(username, password){
    const data = {
      username: username,
      password: password
    }

     return this.http.post(`${this.uri}/users/login`, data);
  }

  register(username, password, firstname, lastname, email, phone, address, img){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      address: address,
      img:img
    }

    return this.http.post(`${this.uri}/users/register`, data);
  }

  sameusername(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/users/sameusername`, data)
  }

  sameemail(email){
    const data={
      email:email
    }
    return this.http.post(`${this.uri}/users/sameemail`, data)
  }

  getAllUsers(){
    return this.http.get(`${this.uri}/users/getAllUsers`)
  }

  approve(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/approve`, data)
  }

  delete(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/delete`, data)
  }

  updatepassword(username,password){
    const data = {
      username:username,
      password:password
    }
    return this.http.post(`${this.uri}/users/updatepassword`, data)
  }

  getUser(username){
    return this.http.get(`${this.uri}/users/getUser?username=${username}`)
  }

  update(oldusername,username,password,firstname,lastname,email,address,type,phone,img){
    const data = {
      oldusername:oldusername,
      username:username,
      password:password,
      firstname:firstname,
      lastname:lastname,
      email:email,
      address:address,
      type:type,
      phone:phone,
      img:img
    }
    return this.http.post(`${this.uri}/users/update`, data)
  }

  getDefaultUserPicture(){
    return this.http.get(`${this.uri}/users/getDefaultUserPicture`)
  }

  addUser(firstname,lastname,username,password,email,address,type,phone,img){
    const data = {
      username:username,
      password:password,
      firstname:firstname,
      lastname:lastname,
      email:email,
      address:address,
      type:type,
      phone:phone,
      img:img
    }
    return this.http.post(`${this.uri}/users/addUser`, data)
  }

}
