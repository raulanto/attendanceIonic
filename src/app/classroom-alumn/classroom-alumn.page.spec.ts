import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassroomAlumnPage } from './classroom-alumn.page';

describe('ClassroomAlumnPage', () => {
  let component: ClassroomAlumnPage;
  let fixture: ComponentFixture<ClassroomAlumnPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClassroomAlumnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
