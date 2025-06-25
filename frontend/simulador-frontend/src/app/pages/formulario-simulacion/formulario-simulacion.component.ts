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
    fechaNacimiento: '',
    edad: 0,
    ciudad: '',
    abonoCapital: 0
  };

  constructor(private http: HttpClient, private router: Router) {}

  guardarSimulacion() {
    // Calculamos edad en base a la fecha de nacimiento
    if (this.simulacion.fechaNacimiento) {
      const hoy = new Date();
      const nacimiento = new Date(this.simulacion.fechaNacimiento);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mes = hoy.getMonth() - nacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      this.simulacion.edad = edad;
    }

    // Ciudad fija de momento, o puedes poner un campo en el formulario
    this.simulacion.ciudad = 'Bogotá'; 

    this.http.post('http://localhost:3003/simulador', this.simulacion)
      .subscribe({
        next: (res) => {
          console.log('Simulación guardada:', res);
          this.router.navigate(['/simulador/resultados']);
        },
        error: (err) => {
          console.error('Error al guardar la simulación:', err);
          alert('Ocurrió un error al guardar la simulación');
        }
      });
  }
}
