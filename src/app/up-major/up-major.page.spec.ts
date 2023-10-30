import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpMajorPage } from './up-major.page';

describe('UpMajorPage', () => {
  let component: UpMajorPage;
  let fixture: ComponentFixture<UpMajorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpMajorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
