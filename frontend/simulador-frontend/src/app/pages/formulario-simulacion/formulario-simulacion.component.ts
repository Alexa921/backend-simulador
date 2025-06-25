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
    fechaNacimiento: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  guardarSimulacion() {
    const payload = {
      ...this.simulacion,
      plazo: Number(this.simulacion.plazo)
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
}
