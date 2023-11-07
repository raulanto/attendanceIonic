import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewlibraryPage } from './newlibrary.page';

describe('NewlibraryPage', () => {
  let component: NewlibraryPage;
  let fixture: ComponentFixture<NewlibraryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewlibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
