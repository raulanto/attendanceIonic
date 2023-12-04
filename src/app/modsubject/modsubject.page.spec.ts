import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModsubjectPage } from './modsubject.page';

describe('ModsubjectPage', () => {
  let component: ModsubjectPage;
  let fixture: ComponentFixture<ModsubjectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModsubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
