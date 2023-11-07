import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElimSubjectPage } from './elim-subject.page';

describe('ElimSubjectPage', () => {
  let component: ElimSubjectPage;
  let fixture: ComponentFixture<ElimSubjectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ElimSubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
