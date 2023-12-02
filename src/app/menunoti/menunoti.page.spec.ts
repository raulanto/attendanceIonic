import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MenunotiPage } from './menunoti.page';

describe('MenunotiPage', () => {
  let component: MenunotiPage;
  let fixture: ComponentFixture<MenunotiPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenunotiPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MenunotiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
