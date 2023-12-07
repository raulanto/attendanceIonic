import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelecionMAPage } from './selecion-ma.page';

describe('SelecionMAPage', () => {
  let component: SelecionMAPage;
  let fixture: ComponentFixture<SelecionMAPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelecionMAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
