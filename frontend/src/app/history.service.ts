import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getHistory(username){
    return this.http.get(`${this.uri}/history/getHistory?username=${username}`);
  }

  addHistory(history, username, idB){
    const data = {
      postoji:history,
      username:username,
      idB:idB
    }
    return this.http.post(`${this.uri}/history/addHistory`, data)
  }

  removeHistory(username,id){
    const data = {
      username:username,
      id:id
    }
    return this.http.post(`${this.uri}/history/removeHistory`, data)
  }

}
