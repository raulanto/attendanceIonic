import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodigoService } from './CodigoService ';

@Component({
  selector: 'app-generar-codigo',
  templateUrl: './generar-codigo.page.html',
  styleUrls: ['./generar-codigo.page.scss'],
})
export class GenerarCodigoPage implements OnInit {

  public grupoid: any;
  public nuevoCodigo: any;

  constructor(
    private route: ActivatedRoute,
    private codigoService: CodigoService,
    ) {
    // Acceder al valor de 'grupoid' y asignarlo a la propiedad de clase 'grupoid'
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');
    this.nuevoCodigo = this.codigoService.generarCodigo();
  }

  
  ngOnInit() {
    this.mostrar();
  }
  // Una función que utiliza el valor de 'grupoid'
  mostrar() {
    console.log('Valor de grupoid en generar codigo:', this.grupoid);
    console.log(this.nuevoCodigo);
    
  }

  

}
