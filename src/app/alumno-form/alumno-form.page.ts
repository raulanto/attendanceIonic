import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginPersonService } from '../services/login-person.service';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.page.html',
  styleUrls: ['./alumno-form.page.scss'],
})
export class AlumnoFormPage implements OnInit {

  public registro!: FormGroup;



  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye!: ElementRef;

  passwordTypeInput = 'password';
  validation_messages: any = {
    'username': [
      { type: 'required', message: "Nombre de usuario requerido." },
      { type: 'minLength', message: "El nombre de usuario debe contener al menos 8 caracteres." },
      { type: 'maxlength', message: "El usario no puede contener mas de 10 caracteres" },
      { type: 'pattern', message: "Digita un usuario valida" },
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
    'per_name': [
      { type: 'required', message: "Nombre(s) requerido(s)" },
    ],
    'per_paternal': [
      { type: 'required', message: "Apellido requerido" },
    ],
    'per_maternal': [
      { type: 'required', message: "Apellido requerido" },
    ],
    'per_email': [
      { type: 'required', message: "Correo requerido" },
      { type: 'pattern', message: 'Tiene que llevar @gamil.com' },
    ],
    'per_phone': [
      { type: 'required', message: 'Numero requerido' },
      { type: 'minLength', message: "Debe contener al menos 10 numeros" },
      { type: 'pattern', message: 'Ingrese numeros' },

    ]

  }



  constructor(
    private formBuilder: FormBuilder,
    private loginPersonService: LoginPersonService,
    private alertCtrl: AlertController,
    private router: Router,
  ) {

  }
  //Cargar tipo de estudio
  degrees: any = [];
  //base de degree
  baseDegre: string = 'http://attendance.test/degree';
  ngOnInit() {

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
      per_name: ['', [Validators.required]],
      per_paternal: ['', [Validators.required]],
      per_maternal: ['', [Validators.required]],
      per_phone: ['', Validators.compose([

        Validators.minLength(10),
        Validators.pattern('^[0-9]*$'),
        Validators.required
      ])],
      per_email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
        Validators.required
      ])],


    }, { validator: this.checkIfMatchingPasswords('password', 'password_confirm') });
  }
  //mostrar contrase;a
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
      await this.loginPersonService.registrar(registrarData).subscribe(
        async response => {
          if (response?.status == 200 ) {
            await localStorage.setItem('token', response?.data);
            localStorage.setItem('sesion', 'login');
            localStorage.setItem('username', registrarData.username);
            this.alterCreado(registrarData.username);
            this.router.navigate(['tab1']);
          } else if (response?.data === '') {
            this.alertError();
          }
        },
        error => {
          if (error.status == 422) {
            this.alertDuplicado();
          }else if (error.status == 400) {
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
  async alterCreado(nombre:any) {
    const alert = await this.alertCtrl.create({
      header: 'Importante',
      subHeader: 'Creado',
      message: 'Creado el usuario'+nombre,
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });

    await alert.present();
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
