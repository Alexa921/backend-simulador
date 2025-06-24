import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioSimulacionComponent } from './formulario-simulacion.component';

describe('FormularioSimulacionComponent', () => {
  let component: FormularioSimulacionComponent;
  let fixture: ComponentFixture<FormularioSimulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioSimulacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioSimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
