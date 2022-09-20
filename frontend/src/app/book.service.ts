import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from './models/rating';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  getAllBooks(){
    return this.http.get(`${this.uri}/books/getAllBooks`);
  }

  searchBooks(searchParam){
    return this.http.get(`${this.uri}/books/searchBooks?param=${searchParam}`);
  }

  getBookById(id){
    return this.http.get(`${this.uri}/books/getBookById?id=${id}`)
  }

  decrease(idB){
    const data ={
      idB:idB
    }
    return this.http.post(`${this.uri}/books/decrease`, data)
  }
  
  increase(idB){
    const data ={
      idB:idB
    }
    return this.http.post(`${this.uri}/books/increase`, data)
  }

  timestaken(idB){
    const data ={
      idB:idB
    }
    return this.http.post(`${this.uri}/books/timestaken`, data)
  }



  update(idB, name, author, genre, publisher, publication, language, number, img){
    const data = {
      idB:idB,
      name:name,
      author:author,
      genre:genre,
      publisher:publisher,
      publication:publication,
      language:language,
      number:number,
      img:img
    }

    return this.http.post(`${this.uri}/books/update`, data)
  }

  updaterating(idB, avg){
    const data = {
      idB:idB,
      avg:avg
    }
    return this.http.post(`${this.uri}/books/updaterating`, data)
  }

  addBook(idB, name, author, genre, publisher, publication, language, number, img, rating){
    const data = {
        name:name,
        author:author,
        timestaken:0,
        img:img,
        rating:rating,
        idB:idB,
        genre:genre,
        publisher:publisher,
        language:language,
        publication:publication,
        number:number
    }
    return this.http.post(`${this.uri}/books/addBook`, data)
  }

  getDefaultBookPicture(){
    return this.http.get(`${this.uri}/books/getDefaultBookPicture`)
  }

  delete(idB){
    const data = {
      idB:idB
    }
    return this.http.post(`${this.uri}/books/delete`, data)
  }
}
