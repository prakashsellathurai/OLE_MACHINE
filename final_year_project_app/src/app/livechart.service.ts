import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class LivechartService {

  constructor(private http: Http) { }
  dataprovider (url:string){
   return  this.http.get(`http://${url}`);
}
}
