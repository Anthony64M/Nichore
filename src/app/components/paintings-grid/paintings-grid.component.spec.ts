import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingsGridComponent } from './paintings-grid.component';

describe('PaintingsGridComponent', () => {
  let component: PaintingsGridComponent;
  let fixture: ComponentFixture<PaintingsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
