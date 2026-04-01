import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunCeramicComponent } from './sun-ceramic.component';

describe('SunCeramicComponent', () => {
  let component: SunCeramicComponent;
  let fixture: ComponentFixture<SunCeramicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SunCeramicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SunCeramicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
