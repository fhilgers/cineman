import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingGridComponent } from './rating-grid.component';

describe('RatingGridComponent', () => {
  let component: RatingGridComponent;
  let fixture: ComponentFixture<RatingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
