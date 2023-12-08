import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupAlumPage } from './group-alum.page';

describe('GroupAlumPage', () => {
  let component: GroupAlumPage;
  let fixture: ComponentFixture<GroupAlumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GroupAlumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
