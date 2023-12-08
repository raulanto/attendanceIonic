import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.page.html',
  styleUrls: ['./question-detail.page.scss'],
})
export class QuestionDetailPage implements OnInit {
  questiondetails: any = [];
  questionId: number =0;
  constructor(  
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertController: AlertController) { }

  ngOnInit() {
      this.cargarQuestionsDet();
    ;
  }

  async cargarQuestionsDet(event?: InfiniteScrollCustomEvent) {
    const queId = this.route.snapshot.paramMap.get('que_id');
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'GET',
      // Url de Monica
      url: "http://attendance.test/answer/"+ queId +"?expand=title,desc",
      // Url de Zarate
      //url: "http://attendancebd.test/question?expand=tag,teacher,person",      
      // Url de Raul
      //url: "http://attendancedb1.test/question?expand=tag,teacher,person",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.questiondetails = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }
}
