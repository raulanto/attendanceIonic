import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroFormPage } from './maestro-form.page';

describe('MaestroFormPage', () => {
  let component: MaestroFormPage;
  let fixture: ComponentFixture<MaestroFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MaestroFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
