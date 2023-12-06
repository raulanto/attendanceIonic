import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionMaPage } from './seleccion-ma.page';

describe('SeleccionMaPage', () => {
  let component: SeleccionMaPage;
  let fixture: ComponentFixture<SeleccionMaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeleccionMaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
