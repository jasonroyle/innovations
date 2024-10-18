import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorIndicatorComponent } from './color-indicator.component';

describe('ColorIndicatorComponent', () => {
  let component: ColorIndicatorComponent;
  let fixture: ComponentFixture<ColorIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
