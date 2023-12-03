import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-maestro-form',
  templateUrl: './maestro-form.page.html',
  styleUrls: ['./maestro-form.page.scss'],
})
export class MaestroFormPage implements OnInit {

  public registro!: FormGroup;



  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye!: ElementRef;

  passwordTypeInput = 'password';
  validation_messages: any = {
    'username': [
      { type: 'required', message: 'Matrícula requerida.' },
      { type: 'minlength', message: 'Matrícula debe contener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'Matrícula no puede contener más de 10 caracteres.' },
      { type: 'pattern', message: 'Dígita un usuario valida' },
    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'Contraseña debe contener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'Contraseña no puede contener más de 15 caracteres.' },
      { type: 'pattern', message: 'Dígita una contraseña valida' },
    ],
    'password_confirm': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'Contraseña debe contener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'Contraseña no puede contener más de 15 caracteres.' },
      { type: 'pattern', message: 'Dígita una contraseña valida' },
      { type: 'notEquivalent', message: 'No coinciden las contraseñas' },
    ],
    'tea_name': [
      { type: 'required', message: "Nombre(s) requerido(s)" },
    ],
    'tea_paternal': [
      { type: 'required', message: "Apellido requerido" },
    ],
    'tea_maternal': [
      { type: 'required', message: "Apellido requerido" },
    ],
    'tea_mail': [
      { type: 'required', message: "Correo requerido" },
      { type: 'pattern', message: 'Tiene que llevar @gamil.com' },
    ],
    'tea_phone': [
      { type: 'required', message: 'Numero requerido' },
      { type: 'minLength', message: "Debe contener al menos 10 numeros" },
      { type: 'pattern', message: 'Ingrese numeros' },

    ],
    'tea_fkdegree': [
      { type: 'required', message: 'Selecione una opcion' }
    ],

  }




  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertCtrl: AlertController,
    private router: Router
  ) {

  }
  //Cargar tipo de estudio
  degrees: any = [];
  //base de degree
  baseDegre: string = 'http://basic.test/degree';
  ngOnInit() {
    this.cargarDegree();
    this.buildForm();
  }
  buildForm() {
    this.registro = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(8),
        Validators.pattern("^(?=.*[0-9]).{8,15}$"),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(8),
        Validators.pattern("^(?=.*[-!#$%&/()?¡_])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,15}$"),
        Validators.required
      ])],
      password_confirm: ['', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(8),
        Validators.pattern("^(?=.*[-!#$%&/()?¡_])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,15}$"),
        Validators.required
      ])],
      tea_name: ['', [Validators.required]],
      tea_paternal: ['', [Validators.required]],
      tea_maternal: ['', [Validators.required]],
      tea_phone: ['', Validators.compose([

        Validators.minLength(10),
        Validators.pattern('^[0-9]*$'),
        Validators.required
      ])],
      tea_mail: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
        Validators.required
      ])],
      tea_fkdegree: ['', [Validators.required]],

    }, { validator: this.checkIfMatchingPasswords('password', 'password_confirm') });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }
  async submitRegistrar() {
    localStorage.clear();
    const registrarData = this.registro?.value;
    try {
      await this.loginService.registrar(registrarData).subscribe(
        async response => {
          if (response?.status == 200 && response?.data !== '') {
            await localStorage.setItem('token', response?.data);
            localStorage.setItem('sesion', 'login');
            localStorage.setItem('username', registrarData.username);
            this.router.navigate(['/tabs/tab1']);
          } else if (response?.data === '') {
            this.alertError();
          }
        },
        error => {
          if (error.status == 422) {
            this.alertDuplicado();
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async alertError() {
    const alert = await this.alertCtrl.create({
      header: 'Importante',
      subHeader: 'Error',
      message: 'Nombre de usuario o contraseña incorrecta.',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });

    await alert.present();
  }
  async alertDuplicado() {
    const alert = await this.alertCtrl.create({
      header: 'Importante',
      subHeader: 'Duplicado',
      message: 'La matricula ya se encuentra registrada',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });

    await alert.present();
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

  getError(controlName: string) {
    let errors: any[] = [];
    const control = this.registro.get(controlName);
    if (control!.touched && control!.errors != null) {
      errors = JSON.parse(JSON.stringify(control!.errors));
    }
    return errors;
  }

  login() {
    this.router.navigate(['/']);
  }

  togglePasswordMode() {
    const e = window.event;
    e!.preventDefault();
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);

  }



}
