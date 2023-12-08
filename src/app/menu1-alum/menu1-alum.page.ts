import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu1-alum',
  templateUrl: './menu1-alum.page.html',
  styleUrls: ['./menu1-alum.page.scss'],
})
export class Menu1AlumPage implements OnInit {
  public grupoid: any;
  public gruposubject: any;
  public grupocode: any;

  constructor(private route: ActivatedRoute) {
    // Acceder al valor de 'grupoid' y asignarlo a la propiedad de clase 'grupoid'
    this.grupoid = this.route.snapshot.paramMap.get('gro_id');
    this.gruposubject = this.route.snapshot.paramMap.get('gro_subject');
    this.grupocode = this.route.snapshot.paramMap.get('gro_code');
  }
  ngOnInit() {
    this.mostrar();
  }
 
  // Una función que utiliza el valor de 'grupoid'
  mostrar() {
    console.log('Valor de grupoid en mi menu1:', this.grupoid);
    console.log('Valor de gruposubject en mi menu1:', this.gruposubject);
    console.log('Valor de grupocode en mi menu1:', this.grupocode);
    // Puedes realizar otras acciones con 'grupoid' aquí
  }

}
