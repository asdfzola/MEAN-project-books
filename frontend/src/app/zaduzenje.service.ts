import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZaduzenjeService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllZaduzenja(){
    return this.http.get(`${this.uri}/zaduzenja/getAllZaduzenja`);
  }

  getZaduzenje(username){
    return this.http.get(`${this.uri}/zaduzenja/getZaduzenje?username=${username}`);
  }

  borrow(postoji,idB, username){
    const data={
      postoji:postoji,
      idB:idB,
      username:username
    }
    return this.http.post(`${this.uri}/zaduzenja/borrow`, data)
  }

  razduzi(username, idB, id){
    const data={
      username:username,
      idB:idB,
      id:id
    }
    return this.http.post(`${this.uri}/zaduzenja/razduzi`, data)
  }

  clear(username){
    const data ={
      username:username
    }
    return this.http.post(`${this.uri}/zaduzenja/clear`, data)
  }

  update(username, i, number){
    const data = {
      username:username,
      i:i,
      number:number
    }
    return this.http.post(`${this.uri}/zaduzenja/update`, data)
  }
}
