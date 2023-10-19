import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {

  constructor(
    private loadingCtrl : LoadingController,
  ) { }

  grade:any = [];

  ngOnInit() {
    this.loadGrade();
  }

  async loadGrade(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message : 'Cargando',
        spinner : 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        //url : "http://attendancedb.test/extracurricular",
        url : "http://attendancedb.test/grade",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then( (response) => {
        this.grade = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

}