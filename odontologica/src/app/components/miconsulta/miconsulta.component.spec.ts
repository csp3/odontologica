import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiconsultaComponent } from './miconsulta.component';

describe('MiconsultaComponent', () => {
  let component: MiconsultaComponent;
  let fixture: ComponentFixture<MiconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiconsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
