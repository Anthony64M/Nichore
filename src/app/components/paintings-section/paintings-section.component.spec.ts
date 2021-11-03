import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingsSectionComponent } from './paintings-section.component';

describe('PaintingsSectionComponent', () => {
  let component: PaintingsSectionComponent;
  let fixture: ComponentFixture<PaintingsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
