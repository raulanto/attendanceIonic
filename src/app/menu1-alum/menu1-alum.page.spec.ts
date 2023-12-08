import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu1AlumPage } from './menu1-alum.page';

describe('Menu1AlumPage', () => {
  let component: Menu1AlumPage;
  let fixture: ComponentFixture<Menu1AlumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Menu1AlumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
