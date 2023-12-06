import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewquestionPage } from './newquestion.page';

describe('NewquestionPage', () => {
  let component: NewquestionPage;
  let fixture: ComponentFixture<NewquestionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewquestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
