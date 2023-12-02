import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menunoti',
  templateUrl: './menunoti.page.html',
  styleUrls: ['./menunoti.page.scss'],
})
export class MenunotiPage implements OnInit {
  public grupoid: any;

  constructor(private route: ActivatedRoute) {
    // Acceder al valor de 'grupoid' y asignarlo a la propiedad de clase 'grupoid'
    this.grupoid = this.route.snapshot.paramMap.get('gro_id');
   }

  ngOnInit() {
    this.mostrar();
  }

  // Una función que utiliza el valor de 'grupoid'
  mostrar() {
    console.log('Valor de grupoid en asistencia:', this.grupoid);
  }

}
