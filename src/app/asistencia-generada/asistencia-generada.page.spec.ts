import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaGeneradaPage } from './asistencia-generada.page';

describe('AsistenciaGeneradaPage', () => {
  let component: AsistenciaGeneradaPage;
  let fixture: ComponentFixture<AsistenciaGeneradaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsistenciaGeneradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
