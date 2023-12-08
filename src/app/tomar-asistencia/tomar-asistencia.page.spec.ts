import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TomarAsistenciaPage } from './tomar-asistencia.page';

describe('TomarAsistenciaPage', () => {
  let component: TomarAsistenciaPage;
  let fixture: ComponentFixture<TomarAsistenciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TomarAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
