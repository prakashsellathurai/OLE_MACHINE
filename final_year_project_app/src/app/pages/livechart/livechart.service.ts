import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class LivechartService {

  constructor(private http: Http) { }
  dataprovider (){
   return  this.http.get('http://42.42.42.42');
}
}
