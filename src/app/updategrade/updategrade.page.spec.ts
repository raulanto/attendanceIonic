import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdategradePage } from './updategrade.page';

describe('UpdategradePage', () => {
  let component: UpdategradePage;
  let fixture: ComponentFixture<UpdategradePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdategradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
