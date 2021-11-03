import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingsSearchBarComponent } from './paintings-search-bar.component';

describe('PaintingsSearchBarComponent', () => {
  let component: PaintingsSearchBarComponent;
  let fixture: ComponentFixture<PaintingsSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingsSearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingsSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
