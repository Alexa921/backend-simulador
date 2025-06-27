import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-formulario-simulacion',
  standalone: true,
  templateUrl: './formulario-simulacion.component.html',
  styleUrl: './formulario-simulacion.component.css',
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class FormularioSimulacionComponent {

  simulacion = {
    nombre: '',
    identificacion: '',
    email: '',
    telefono: '',
    direccion: '',
    monto: 0,
    plazo: 48,
    tasa: 5,
    fechaNacimiento: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  guardarSimulacion() {
    const payload = {
      ...this.simulacion,
      monto: Number(String(this.simulacion.monto).replace(/[^0-9]/g, '')),
      plazo: Number(this.simulacion.plazo),
      tasa: Number(this.simulacion.tasa)
    };

    this.http.post('http://localhost:3003/simulador', payload)
      .subscribe({
        next: (res) => {
          console.log('Simulación guardada:', res);
          localStorage.setItem('resultadoSimulacion', JSON.stringify(res));
          this.router.navigate(['/simulador/resultados']);
        },
        error: (err) => {
  console.error('Error al guardar la simulación:', err);
  alert('Ocurrió un error al guardar la simulación');
}

      });
  }

  formatearPesos(valor: number): string {
    if (!valor) return '';
    return valor.toLocaleString('es-CO');
  }

  actualizarMonto(event: any): void {
    const valorSinFormato = event.target.value.replace(/[^0-9]/g, '');
    this.simulacion.monto = Number(valorSinFormato);
  }
}
