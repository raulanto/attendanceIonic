import axios from 'axios';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginPersonService {
  urlPerson:string  = `${environment.apiUrl}person/`;
  headers:any = {'Content-Type': 'application/json'}; 
  constructor() { }

  login(dataLogin: any): Observable<any> {
    const url = `${this.urlPerson}login`;
    return new Observable(observer => {
      axios.post(url, dataLogin, {
        withCredentials: true,
        headers: this.headers
      })
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  registrar(dataRegistrar: any): Observable<any> {
    const url = `${this.urlPerson}registrar`;
    return new Observable(observer => {
      axios.post(url, dataRegistrar, {
        withCredentials: true,
        headers: this.headers
      })
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }
}
