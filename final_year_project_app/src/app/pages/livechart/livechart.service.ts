import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LivechartService {

  constructor(private http: Http) { }
  dataprovider (){
   return  this.http.get('http://localhost:3000');
}
}
