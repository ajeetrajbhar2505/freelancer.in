import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodetokenComponent } from './decodetoken.component';

describe('DecodetokenComponent', () => {
  let component: DecodetokenComponent;
  let fixture: ComponentFixture<DecodetokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecodetokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecodetokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
