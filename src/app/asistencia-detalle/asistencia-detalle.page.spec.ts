import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaDetallePage } from './asistencia-detalle.page';

describe('AsistenciaDetallePage', () => {
  let component: AsistenciaDetallePage;
  let fixture: ComponentFixture<AsistenciaDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsistenciaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
