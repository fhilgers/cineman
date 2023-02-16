import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterCreateComponent } from './theater-create.component';

describe('TheaterCreateComponent', () => {
  let component: TheaterCreateComponent;
  let fixture: ComponentFixture<TheaterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheaterCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TheaterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
