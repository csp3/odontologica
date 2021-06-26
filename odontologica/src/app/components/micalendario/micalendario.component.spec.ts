import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicalendarioComponent } from './micalendario.component';

describe('MicalendarioComponent', () => {
  let component: MicalendarioComponent;
  let fixture: ComponentFixture<MicalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicalendarioComponent ]
    }) 
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
