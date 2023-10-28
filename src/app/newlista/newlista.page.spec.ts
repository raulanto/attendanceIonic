import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewlistaPage } from './newlista.page';

describe('NewlistaPage', () => {
  let component: NewlistaPage;
  let fixture: ComponentFixture<NewlistaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewlistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
