import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getRating(id){
    return this.http.get(`${this.uri}/ratings/getRatingById?id=${id}`);
  }

  addComment(id, idB, username, ocena, comment){
    const data={
      id:id,
      idB: idB,
      username:username,
      comment:comment,
      ocena:ocena
    }
    return this.http.post(`${this.uri}/ratings/addComment`, data)
  }
}
