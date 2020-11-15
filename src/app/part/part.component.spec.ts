import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PartComponent } from './part.component';

describe('PartComponent', () => {
  let component: PartComponent;
  let fixture: ComponentFixture<PartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartComponent],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
