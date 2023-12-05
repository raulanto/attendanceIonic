import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NeweventsPage } from './newevents.page';

describe('NeweventsPage', () => {
  let component: NeweventsPage;
  let fixture: ComponentFixture<NeweventsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NeweventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
