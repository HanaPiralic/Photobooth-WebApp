import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalStrip } from './final-strip';

describe('FinalStrip', () => {
  let component: FinalStrip;
  let fixture: ComponentFixture<FinalStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalStrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalStrip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
