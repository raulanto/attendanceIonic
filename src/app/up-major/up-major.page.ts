import { Component, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-up-major',
  templateUrl: './up-major.page.html',
  styleUrls: ['./up-major.page.scss'],
})
export class UpMajorPage {

  @Input() selectedMajor: any | undefined;

  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router, private navCtrl: NavController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) { }

  majorUrl: string = "http://attendanceproyect.atwebpages.com/major"
  private editarDatos = [];

  ngOnInit() {

    this.loadMajor();
    if (this.selectedMajor !== undefined) {
      this.getDetalles();
    }
    this.formulario();


  }

}

/* async editar(matricula: string) {

   const paginaModal = await this.modalCtrl.create({
   component: UpMajorPage,
   componentProps: {
       'matricula': matricula
   },
   breakpoints: [0, 0.3, 0.5, 0.95],
   initialBreakpoint: 0.95
   });
   await paginaModal.present();

   paginaModal.onDidDismiss().then((data) => {
       this.cargarAlumnos();
   });
}
*/

