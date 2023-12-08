import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddgradePage } from './addgrade.page';

describe('AddgradePage', () => {
  let component: AddgradePage;
  let fixture: ComponentFixture<AddgradePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddgradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
