import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewclassroomPage } from './newclassroom.page';

describe('NewclassroomPage', () => {
  let component: NewclassroomPage;
  let fixture: ComponentFixture<NewclassroomPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewclassroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
