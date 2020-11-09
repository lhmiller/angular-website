import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucasComponent } from './lucas.component';

describe('LucasComponent', () => {
  let component: LucasComponent;
  let fixture: ComponentFixture<LucasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LucasComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LucasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
