import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGridComponent } from './show-grid.component';

describe('ShowGridComponent', () => {
  let component: ShowGridComponent;
  let fixture: ComponentFixture<ShowGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
