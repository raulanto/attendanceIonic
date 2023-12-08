import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { LoginPersonService } from '../services/login-person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login!: FormGroup;

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye!: ElementRef;

  passwordTypeInput = 'password';

  validation_messages:any = {
    'username': [
      { type: 'required', message: 'Usuario requerid.' },
      { type: 'minlength', message: 'Usuario debe contener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'Matrícula no puede contener más de 10 caracteres.' },
      { type: 'pattern', message: 'Dígita una matrícula valida' },
    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'Contraseña debe contener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'Contraseña no puede contener más de 10 caracteres.' },
      { type: 'pattern', message: 'Dígita una contraseña valida' },
    ]
  }


  constructor(
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private router: Router,
    private loginService: LoginService,
    private loginPersonService:LoginPersonService
  ) { }


  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.login = this.formBuilder.group({
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
    });
  }
  async submitLogin() {
    localStorage.clear();
    const loginData = this.login?.value;
    try {
      await this.loginService.login(loginData).subscribe(
        async response => {
          if (response?.status == 200 && response?.data !== '') {
            await localStorage.setItem('token', response?.data);
            localStorage.setItem('sesion', 'login');
            localStorage.setItem('username', loginData.username);
            this.router.navigate(['group']);
          } else if( response?.data === '') {
            this.alertError();
          }
        },
        error => {
          console.log(error);
        }
      );
      await this.loginPersonService.login(loginData).subscribe(
        async response => {
          if (response?.status == 200 && response?.data !== '') {
            await localStorage.setItem('token', response?.data);
            localStorage.setItem('sesion', 'login');
            localStorage.setItem('username', loginData.username);
            this.router.navigate(['group_alum']);
          } else if( response?.data === '') {
            this.alertError();
          }
        },
        error => {
          console.log(error);
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

  getError(controlName: string) {
    let errors: any[] = [];
    const control = this.login.get(controlName);
    if (control!.touched && control!.errors != null) {
      errors = JSON.parse(JSON.stringify(control!.errors));
    }
    return errors;
  }

  registrar() {
    this.router.navigate(['/registro']);
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
