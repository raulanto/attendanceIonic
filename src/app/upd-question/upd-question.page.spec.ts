import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdQuestionPage } from './upd-question.page';

describe('UpdQuestionPage', () => {
  let component: UpdQuestionPage;
  let fixture: ComponentFixture<UpdQuestionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
