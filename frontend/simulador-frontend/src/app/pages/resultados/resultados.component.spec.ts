import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadosSimulacionComponent } from './resultados.component';

describe('ResultadosSimulacionComponent', () => {
  let component: ResultadosSimulacionComponent;
  let fixture: ComponentFixture<ResultadosSimulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosSimulacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosSimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
