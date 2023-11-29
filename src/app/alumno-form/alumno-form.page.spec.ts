import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnoFormPage } from './alumno-form.page';

describe('AlumnoFormPage', () => {
  let component: AlumnoFormPage;
  let fixture: ComponentFixture<AlumnoFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlumnoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
