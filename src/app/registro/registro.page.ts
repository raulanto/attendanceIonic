import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  tipoPersona: string='';
  

  constructor() { }
  //Cargar tipo de estudio
  degrees:any=[];
  //base de degree
  baseDegre:string='http://attendancedb.test/degree';
  ngOnInit() {
    this.cargarDegree();
  }


  customActionSheetOptions = {
    header: 'Que eres?',
    subHeader: 'Seleciona tu posicion en tu institucion',
  };

  async cargarDegree() {
    const response = await axios({
      method: 'get',
      url: this.baseDegre,
      withCredentials: true,
      headers: {
        //token Bearer 100-token
        'Accept': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      this.degrees = response.data;
      // console.log(this.degrees);
      
    }).catch(function (error) {
      console.log(error);
    });
    
  }
}
