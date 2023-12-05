import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodiogogPage } from './codiogog.page';

describe('CodiogogPage', () => {
  let component: CodiogogPage;
  let fixture: ComponentFixture<CodiogogPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CodiogogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
