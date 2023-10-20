import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewextracurricularPage } from './newextracurricular.page';

describe('NewextracurricularPage', () => {
  let component: NewextracurricularPage;
  let fixture: ComponentFixture<NewextracurricularPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewextracurricularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
