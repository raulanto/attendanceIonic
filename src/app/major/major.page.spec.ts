import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MajorPage } from './major.page';

describe('MajorPage', () => {
  let component: MajorPage;
  let fixture: ComponentFixture<MajorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MajorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
