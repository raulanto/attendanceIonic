import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewgroupPage } from './newgroup.page';

describe('NewgroupPage', () => {
  let component: NewgroupPage;
  let fixture: ComponentFixture<NewgroupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewgroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
