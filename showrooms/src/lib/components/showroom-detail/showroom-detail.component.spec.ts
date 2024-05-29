import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowroomDetailComponent } from './showroom-detail.component';

describe('ShowroomDetailComponent', () => {
  let component: ShowroomDetailComponent;
  let fixture: ComponentFixture<ShowroomDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowroomDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowroomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
