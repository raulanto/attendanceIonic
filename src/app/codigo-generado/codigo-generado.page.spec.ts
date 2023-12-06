import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoGeneradoPage } from './codigo-generado.page';

describe('CodigoGeneradoPage', () => {
  let component: CodigoGeneradoPage;
  let fixture: ComponentFixture<CodigoGeneradoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CodigoGeneradoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
