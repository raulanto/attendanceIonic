import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarCodigoPage } from './generar-codigo.page';

describe('GenerarCodigoPage', () => {
  let component: GenerarCodigoPage;
  let fixture: ComponentFixture<GenerarCodigoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenerarCodigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
