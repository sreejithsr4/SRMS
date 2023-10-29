import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiMarkComponent } from './edi-mark.component';

describe('EdiMarkComponent', () => {
  let component: EdiMarkComponent;
  let fixture: ComponentFixture<EdiMarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdiMarkComponent]
    });
    fixture = TestBed.createComponent(EdiMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
