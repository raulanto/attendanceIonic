import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModmajorPage } from './modmajor.page';

describe('ModmajorPage', () => {
  let component: ModmajorPage;
  let fixture: ComponentFixture<ModmajorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModmajorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
