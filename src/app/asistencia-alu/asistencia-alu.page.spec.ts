import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaAluPage } from './asistencia-alu.page';

describe('AsistenciaAluPage', () => {
  let component: AsistenciaAluPage;
  let fixture: ComponentFixture<AsistenciaAluPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsistenciaAluPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
