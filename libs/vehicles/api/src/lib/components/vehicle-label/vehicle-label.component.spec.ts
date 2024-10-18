import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleLabelComponent } from './vehicle-label.component';

describe('VehicleLabelComponent', () => {
  let component: VehicleLabelComponent;
  let fixture: ComponentFixture<VehicleLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
