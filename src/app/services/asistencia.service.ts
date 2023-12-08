import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  urlAttendance:string  = `${environment.apiUrl}attendance/`;

  headers:any = {'Content-Type': 'application/json'}; 
  constructor() { }

  guardar(codigo:any):Observable<any>{
    const url = `${this.urlAttendance}guardar?codigo=${codigo.codigo}&fkList=${codigo.fklist}&commit=${codigo.comentario}`;
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


}
