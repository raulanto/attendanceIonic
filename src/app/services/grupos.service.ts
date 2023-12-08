import axios from 'axios';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class GrupoService {

  urlpersonlista:string  = `${environment.apiUrl}listg`;
  headers:any = {'Content-Type': 'application/json'}; 
  constructor() { }

  grupospersonas(dataLogin: any): Observable<any> {
    const url = `${this.urlpersonlista}/gruposp?id=${dataLogin}`;
    //http://attendance.test/listg/?id=2
    return new Observable(observer => {
      axios.get(url, {
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