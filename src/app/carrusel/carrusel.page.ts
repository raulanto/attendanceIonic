import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.page.html',
  styleUrls: ['./carrusel.page.scss'],
  
})
export class CarruselPage implements OnInit {

  slides: any[] = [];
  
  constructor() {}

  ngOnInit() {
    this.slides = [
      {banner: 'assets/carrusel/page1.svg',text:'Cantando y organizando'},
      {banner: 'assets/carrusel/page2.svg',text:'Logra tus objetivos'},
      {banner: 'assets/carrusel/page3.svg',text:'El tiempo es valioso'},
    ];
  }

}
