import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasicsComponent } from './rxjs-basics.component';

describe('RxjsBasicsComponent', () => {
  let component: RxjsBasicsComponent;
  let fixture: ComponentFixture<RxjsBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsBasicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
