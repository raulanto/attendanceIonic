import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrupoOpcPage } from './grupo-opc.page';

describe('GrupoOpcPage', () => {
  let component: GrupoOpcPage;
  let fixture: ComponentFixture<GrupoOpcPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GrupoOpcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
