import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpSubjectPage } from './up-subject.page';

describe('UpSubjectPage', () => {
  let component: UpSubjectPage;
  let fixture: ComponentFixture<UpSubjectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpSubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
