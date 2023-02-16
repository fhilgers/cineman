import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterCardComponent } from './theater-card.component';

describe('TheaterCardComponent', () => {
  let component: TheaterCardComponent;
  let fixture: ComponentFixture<TheaterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheaterCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TheaterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
