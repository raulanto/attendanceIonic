import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-grupo-opc',
  templateUrl: './grupo-opc.page.html',
  styleUrls: ['./grupo-opc.page.scss'],
})
export class GrupoOpcPage implements OnInit {

  public grupoid: any;

  constructor(private route: ActivatedRoute) {
    // Acceder al valor de 'grupoid' y asignarlo a la propiedad de clase 'grupoid'
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');
  }

  
  ngOnInit() {
    this.mostrar();
  }
 
  // Una función que utiliza el valor de 'grupoid'
  mostrar() {
    console.log('Valor de grupoid en miFuncion:', this.grupoid);

    // Puedes realizar otras acciones con 'grupoid' aquí
  }

}
