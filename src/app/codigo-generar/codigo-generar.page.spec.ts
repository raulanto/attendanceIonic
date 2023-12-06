import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoGenerarPage } from './codigo-generar.page';

describe('CodigoGenerarPage', () => {
  let component: CodigoGenerarPage;
  let fixture: ComponentFixture<CodigoGenerarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CodigoGenerarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
