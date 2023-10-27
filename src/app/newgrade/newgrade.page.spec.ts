import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewgradePage } from './newgrade.page';

describe('NewgradePage', () => {
  let component: NewgradePage;
  let fixture: ComponentFixture<NewgradePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewgradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
