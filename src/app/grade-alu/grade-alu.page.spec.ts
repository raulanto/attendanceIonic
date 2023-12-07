import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradeAluPage } from './grade-alu.page';

describe('GradeAluPage', () => {
  let component: GradeAluPage;
  let fixture: ComponentFixture<GradeAluPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GradeAluPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
