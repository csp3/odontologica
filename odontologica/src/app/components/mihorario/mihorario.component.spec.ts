import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MihorarioComponent } from './mihorario.component';

describe('MihorarioComponent', () => {
  let component: MihorarioComponent;
  let fixture: ComponentFixture<MihorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MihorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MihorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
