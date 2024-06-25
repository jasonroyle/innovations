import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditShowroomComponent } from './edit-showroom.component';

describe('EditShowroomComponent', () => {
  let component: EditShowroomComponent;
  let fixture: ComponentFixture<EditShowroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditShowroomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditShowroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
