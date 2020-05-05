import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutPagePage } from './about-page.page';

describe('AboutPagePage', () => {
  let component: AboutPagePage;
  let fixture: ComponentFixture<AboutPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
