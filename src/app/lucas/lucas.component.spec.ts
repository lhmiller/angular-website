import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleService } from '../shared/title.service';
import { LucasComponent } from './lucas.component';

class MockTitleService {
  setTitle = () => {};
}

describe('LucasComponent', () => {
  let component: LucasComponent;
  let fixture: ComponentFixture<LucasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LucasComponent],
      providers: [{ provide: TitleService, useClass: MockTitleService }],
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
