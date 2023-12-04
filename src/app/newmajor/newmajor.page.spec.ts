import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewmajorPage } from './newmajor.page';

describe('NewmajorPage', () => {
  let component: NewmajorPage;
  let fixture: ComponentFixture<NewmajorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewmajorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
