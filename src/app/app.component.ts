import { Component } from '@angular/core';
// importar los registros de eventos de swiper
import { register } from 'swiper/element/bundle';
// inciar elemento
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
