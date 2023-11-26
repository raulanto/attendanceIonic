import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BannerComponent } from '../banner/banner.component';


@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.page.html',
  styleUrls: ['./carrusel.page.scss'],
  standalone: true,
  imports: [IonicModule, BannerComponent],
})
export class CarruselPage implements OnInit {

  slides: any[] = [];
  
  constructor() {}

  ngOnInit() {
    this.slides = [
      {banner: 'assets/carrusel/page1.svg',text:'Raul es muy pro'},
      {banner: 'assets/carrusel/page2.svg',text:'Para cual quier ocasion'},
      {banner: 'assets/carrusel/page3.svg',text:'No pierdas tiempoion'},
    ];
  }

}
