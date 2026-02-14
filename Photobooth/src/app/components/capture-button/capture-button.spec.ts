import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureButton } from './capture-button';

describe('CaptureButton', () => {
  let component: CaptureButton;
  let fixture: ComponentFixture<CaptureButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptureButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptureButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
