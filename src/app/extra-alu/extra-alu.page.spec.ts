import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtraAluPage } from './extra-alu.page';

describe('ExtraAluPage', () => {
  let component: ExtraAluPage;
  let fixture: ComponentFixture<ExtraAluPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExtraAluPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
