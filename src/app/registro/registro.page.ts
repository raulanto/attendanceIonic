import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { LoginService } from '../services/login.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  public tipoPersona: any;
  validacion_messages:any ={
    'username':[
      {type:'required',message:"Nombre de usuario requerido."},
      {type:'minLength',message:"El nombre de usuario debe contener al menos 8 caracteres."},
      {type:'required',message:"El usario no puede contener mas de 10 caracteres"},
      {type:'required',message:"Digita una matricula valida"},
    ],
    'password':[
      {type:'required',message:"Contraseña requerida."},
      {type:'minLength',message:"El nombre de usuario debe contener al menos 8 caracteres."},
      {type:'required',message:"El usario no puede contener mas de 15 caracteres"},
      {type:'pattern',message:"Digita una contrase;a valida"},
    ],
    'password_confirm':[
      {type:'required',message:"Contraseña requerida."},
      {type:'minLength',message:"El nombre de usuario debe contener al menos 8 caracteres."},
      {type:'required',message:"El usario no puede contener mas de 15 caracteres"},
      {type:'notEquivalent',message:"no coinciden las contrase;as"},
    ],
    'tea_name':[
      {type:'required',message:"Nombre(s) requerido(s)"},
    ],
    'tea_paternal':[
      {type:'required',message:"Nombre(s) requerido(s)"},
    ],
    'tea_maternal':[
      {type:'required',message:"Nombre(s) requerido(s)"},
    ],
    'alu_nombre':[
      {type:'required',message:"Nombre(s) requerido(s)"},
    ],
    'tea_email':[
      {type:'required',message:'Correo requerido'}
    ],
    'tea_phone':[
      {type:'required',message:'Correo requerido'}
    ],
    
    
  }
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.tipoPersona = this.route.snapshot.paramMap.get('selecion');
  }
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
