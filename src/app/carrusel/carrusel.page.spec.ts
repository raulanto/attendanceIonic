import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarruselPage } from './carrusel.page';

describe('CarruselPage', () => {
  let component: CarruselPage;
  let fixture: ComponentFixture<CarruselPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CarruselPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
