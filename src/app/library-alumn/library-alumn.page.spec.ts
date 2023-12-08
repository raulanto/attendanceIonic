import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAlumnPage } from './library-alumn.page';

describe('LibraryAlumnPage', () => {
  let component: LibraryAlumnPage;
  let fixture: ComponentFixture<LibraryAlumnPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LibraryAlumnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
