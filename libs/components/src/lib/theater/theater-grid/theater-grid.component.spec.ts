import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterGridComponent } from './theater-grid.component';

describe('TheaterGridComponent', () => {
  let component: TheaterGridComponent;
  let fixture: ComponentFixture<TheaterGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheaterGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TheaterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
