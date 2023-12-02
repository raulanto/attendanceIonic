import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModgradePage } from './modgrade.page';

describe('ModgradePage', () => {
  let component: ModgradePage;
  let fixture: ComponentFixture<ModgradePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModgradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
