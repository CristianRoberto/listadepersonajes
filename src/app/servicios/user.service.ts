import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  url:any ='https://rickandmortyapi.com/api/character/';
  constructor(private http:HttpClient) {   
  }


  getPersonajes(){
    return this.http.get(`${this.url}`,
  {headers:{"Content-Type":"application/json"}}).toPromise()
  }
}