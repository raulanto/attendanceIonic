import { Component } from '@angular/core';
import axios from 'axios';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-elim-subject',
  templateUrl: './elim-subject.page.html',
  styleUrls: ['./elim-subject.page.scss'],
})
export class ElimSubjectPage {

  items: any = [];
  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
  ) { }

  subject: any = [];
  ngOnInit() {
    this.loadSubjects();
  }


  async loadSubjects(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      // Url
      url: "http://attendancedb.test/subject",      
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.subject = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }
}
