import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesListComponent } from './episodes-list.component';

describe('EpisodesListComponent', () => {
  let component: EpisodesListComponent;
  let fixture: ComponentFixture<EpisodesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
