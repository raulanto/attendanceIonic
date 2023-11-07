import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElimMajorPage } from './elim-major.page';

describe('ElimMajorPage', () => {
  let component: ElimMajorPage;
  let fixture: ComponentFixture<ElimMajorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ElimMajorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
