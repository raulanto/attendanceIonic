import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent,
  LoadingController, 
  ModalController, 
  AlertController } from '@ionic/angular';
import { Router } from '@angular/router';        
import axios from 'axios';
import { NewgroupPage } from '../newgroup/newgroup.page';
import { GrupoService} from "../services/grupos.service"

@Component({
  selector: 'app-group-alum',
  templateUrl: './group-alum.page.html',
  styleUrls: ['./group-alum.page.scss'],
})
export class GroupAlumPage implements OnInit {

  public baseUrl: string = "http://attendancedb.test/group";

  personid=1;
  grupos: any = [];
  data: any = [];

  constructor(
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private grupoService: GrupoService,
  ) { }

  // Una función que utiliza el valor de 'grupoid'
  mostrar() {
    console.log('Valor de idperson en mi groups:', this.data);

    // Puedes realizar otras acciones con 'grupoid' aquí
  }
  busqueda:string = '';
  page:number = 1;
  totalGrupos:number = 0;

  ngOnInit() {
    this.cargarGrupos();
    this.contarGrupos();
    this.mostrar();
  }

  //CARGAR GRUPOS
 
  async cargarGrupos(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try{
      //const response = await this.grupoService.grupospersonas(this.data).toPromise();
      const response = await this.grupoService.grupospersonas(this.personid).toPromise();
      this.grupos = response.data;
      event?.target.complete();
    }catch (error){
      console.error("Error al cargar codigos", error);
    } finally {
      loading.dismiss();
    }
    }
    
  async contarGrupos() {
    let urlApi:string = '';
    if(this.busqueda === '') {
      urlApi = 'http://attendancedb.test/group/total';
    } else {
      urlApi = 'http://attendancedb.test/group/total/' + this.busqueda;
    }
    const response = await axios({
        method: 'get',
        url : urlApi,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token'
        }
    }).then( (response) => {
        console.log(response);  
        this.totalGrupos = response.data;
   }).catch(function (error) {
       console.log(error);     
    });
  }

  pagina(event:any) {
    this.page = event.target.innerText;
    this.cargarGrupos();
  }
  
  handleInput(event:any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarGrupos();
  }

  //CREAR NUEVO GRUPO

  async new() {
    // Crear una página modal utilizando el controlador de modales 
    const paginaModal = await this.modalCtrl.create({
      component: NewgroupPage, // El componente que se mostrará en el modal
      breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
      initialBreakpoint: 0.95, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarGrupos();
  });
  }

  //BORRAR SALON
  
  async eliminar(groupid:any) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + '/' + groupid,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(groupid, 'El grupo ' + groupid + ' ha sido eliminado');
      }
    }).catch((error) => {
      if (error?.response?.status == 500) {
        this.alertEliminado(groupid, "No puedes eliminar porque existe informacion relacionada ");
      }
    });
  }

  async alertEliminado(groupid: any, msg = "") {
    const alert = await this.alertCtrl.create({
    header: 'Grupo',
    subHeader: 'Eliminar',
    message: msg,
    cssClass: 'alert-center',
    buttons: [
        {
        text: 'Continuar',
        role: 'cancel',
        handler: () => {
          this.regresar();
      },
        },
        {
        text: 'Salir',
        role: 'confirm',
        handler: () => {
          this.regresar();
        },
        },
    ],
    });
    await alert.present();
  }

  async editar(groupid: string) {
    const paginaModal = await this.modalCtrl.create({
    component: NewgroupPage,
    componentProps: {
        'groupid': groupid
    },
    breakpoints: [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
        this.cargarGrupos;
    });
  }
  
  //VOLVER A CARGAR
  private regresar() {
    this.router.navigate(['/group']).then(() => {
      window.location.reload();
    });
  }

  //UNIRSE A UN GRUPO
  public alertButtons = ['Unirse'];
  public alertInputs = [
    {
      placeholder: 'Ingresa el código',
      attributes: {
        maxlength: 15,
      },
    },
    
  ];
  
  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Unirse a un equipo con un código',
      inputs: this.alertInputs,
      buttons: [
        {
          text: this.alertButtons[0],
          handler: (data) => {
            // Manejar los datos ingresados en el formulario aquí
            console.log('Datos del formulario:', data);
          },
        }, 
      ],
    });
    await alert.present();
  }
  
}

