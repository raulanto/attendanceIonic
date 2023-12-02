import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotextracurricularPage } from './notextracurricular.page';

describe('NotextracurricularPage', () => {
  let component: NotextracurricularPage;
  let fixture: ComponentFixture<NotextracurricularPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotextracurricularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

