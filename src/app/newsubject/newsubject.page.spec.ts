import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewSubjectPage } from './newsubject.page';

describe('NewsubjectPage', () => {
  let component: NewSubjectPage;
  let fixture: ComponentFixture<NewSubjectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewSubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
