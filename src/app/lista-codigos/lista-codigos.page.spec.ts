import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaCodigosPage } from './lista-codigos.page';

describe('ListaCodigosPage', () => {
  let component: ListaCodigosPage;
  let fixture: ComponentFixture<ListaCodigosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaCodigosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
