import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class CodigoService {
  urlCode:string  = `${environment.apiUrl}code/`;
  headers:any = {'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') || 'Bearer 100-token'};
  constructor() { }

  generarCodigo(codigo:any):Observable<any>{
    const url = `${this.urlCode}generar`;
    return new Observable(observer => {
      axios.post(url, codigo, {
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
  
  codigos(id:number): Observable<any> {
    const url = `${this.urlCode}codigos?id=`+id;
    return new Observable(observer => {
      axios.get(url, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  
}
